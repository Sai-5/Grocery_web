

import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";
const USER_FIELDS = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

// Updated high-quality grocery background
const GROCERY_BG =
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  



  const token = Cookies.get("userJwtToken");
const adminJwt = Cookies.get("adminJwtToken");
  useEffect(() => {
    if (token) {
      navigate("/");
    } else if (adminJwt) {
      navigate("/admin/all-products");
    }
  }, [token, adminJwt, navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };


  const submitLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5100/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      credentials: "include" // if you want cookies sent (optional)
    });

    if (!res.ok) {
      alert("Email or Password didn't match");
      return;
    }

    const data = await res.json();
    console.log(data);

    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    // Navigate based on role
    if (data.user.role === "user") {
      navigate("/shopping");
      alert("Login Successful");
    } else if (data.user.role === "admin") {
      navigate("/admin/dashboard");
      alert("Admin Login Successful");
    } else {
      alert("Invalid login credentials");
    }
  } catch (err) {
    alert("Error during login");
    console.error(err);
  }
};

  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundImage: `url('${GROCERY_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "40px 20px",
        }}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card
              className="shadow border-0 rounded-4"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <Card.Body className="p-5">
                <h3 className="text-center mb-4 fw-bold text-primary">
                  User Login
                </h3>
                <Form onSubmit={submitLogin}>
                  {USER_FIELDS.map(({ name, label, type }) => (
                    <Form.Group
                      className="mb-3 text-start"
                      controlId={name}
                      key={name}
                    >
                      <Form.Label className="fw-semibold">{label}</Form.Label>
                      <Form.Control
                        type={type}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        name={name}
                        value={input[name]}
                        onChange={handleChange}
                        required
                        className="rounded-3 py-2"
                      />
                    </Form.Group>
                  ))}
                  <div className="d-grid mt-4">
                    <Button
                      variant="outline-primary"
                      className="rounded-pill py-2 fw-bold"
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;



