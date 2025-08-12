import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5100/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        navigate("/login");
        alert("Registration successful");
      } else {
        const errorData = await response.json();
        alert("Registration failed: " + errorData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", paddingTop: "10vh", backgroundColor: "#f8f9fa" }}
      >
        <Card className="shadow-lg p-4" style={{ width: "100%", maxWidth: "450px", borderRadius: "12px" }}>
          <Card.Body>
            <h2 className="text-center mb-4 text-primary fw-bold">User Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              {[
                { controlId: "firstName", label: "First Name", type: "text" },
                { controlId: "lastName", label: "Last Name", type: "text" },
                { controlId: "username", label: "Username", type: "text" },
                { controlId: "email", label: "Email", type: "email" },
                { controlId: "password", label: "Password", type: "password" },
              ].map((field) => (
                <Form.Group
                  controlId={field.controlId}
                  className="mb-3 text-start"
                  key={field.controlId}
                >
                  <Form.Label className="fw-semibold">{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    name={field.controlId}
                    value={formData[field.controlId]}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              ))}
              <Button
                type="submit"
                className="w-100 mt-2"
                variant="primary"
                style={{ fontWeight: "600" }}
              >
                Register
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <Link to="/login" className="fw-semibold text-decoration-none text-primary">
                Log In
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Registration;
