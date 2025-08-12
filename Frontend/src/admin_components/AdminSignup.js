import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const commonFields = [
  { controlId: "firstName", label: "First Name", type: "text" },
  { controlId: "lastName", label: "Last Name", type: "text" },
  { controlId: "username", label: "Username", type: "text" },
  { controlId: "email", label: "Email", type: "email" },
  { controlId: "password", label: "Password", type: "password" },
];

const AdminSignup = () => {
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
      const response = await fetch("http://localhost:5100/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/alogin");
        console.log("Admin registration successful:", data);
        alert("Admin Registered Successfully!");
        // ✅ Redirect to Admin Login page
        navigate("/alogin");  
      } else {
        const errorData = await response.json();
        alert("Registration failed: " + errorData.message);
      }
    } catch (error) {
      console.error("Error during admin registration:", error);
      alert("Error during registration");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", paddingTop: "10vh" }}
      >
        <Card
          className="shadow-lg p-4"
          style={{ width: "100%", maxWidth: "450px", borderRadius: "12px" }}
        >
          <Card.Body>
            <h2 className="text-center mb-4 text-primary fw-bold">
              Admin Sign Up
            </h2>
            <Form onSubmit={handleSubmit}>
              {commonFields.map((field) => (
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
                className="w-100 mt-2 fw-semibold"
                variant="primary"
              >
                Sign Up
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <Link
                to="/alogin"
                className="fw-semibold text-decoration-none text-primary"
              >
                Log In
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminSignup;





















