// import { useEffect, useState } from "react";
// import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../components/Header";

// const commonFields = [
//   { controlId: "email", label: "Email", type: "email" },
//   { controlId: "password", label: "Password", type: "password" },
// ];

// const AdminLogin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const adminToken = localStorage.getItem("adminJwtToken");

//   useEffect(() => {
//     if (adminToken) {
//       navigate("/admin/all-products");
//     }
//   }, [adminToken, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5100/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Server response:", data);

//         if (data.adminToken) {
//           // Store the token with the correct key name
//           localStorage.setItem("adminJwtToken", data.adminToken);
//           localStorage.setItem("adminId", data.user._id);

//           // Debug: Check if token was actually stored
//           console.log("Stored token:", localStorage.getItem("adminJwtToken"));

//           alert("Login Successful");
//           navigate("/admin/dashboard");
//         } else {
//           alert("Invalid response from server (missing token)");
//         }
//       } else {
//         alert("Email or Password didn't match");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Error during login. Please try again.");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   return (
//     <>
//       <Header />
//       <Container
//         fluid
//         className="d-flex align-items-center justify-content-center"
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to right, #dfe9f3, #ffffff)",
//           padding: "40px 20px",
//         }}
//       >
//         <Row className="w-100 justify-content-center">
//           <Col xs={12} sm={10} md={6} lg={4}>
//             <Card className="shadow border-0 rounded-4">
//               <Card.Body className="p-5">
//                 <h3 className="text-center mb-4 fw-bold text-primary">
//                   Admin Login
//                 </h3>
//                 <Form onSubmit={handleSubmit}>
//                   {commonFields.map((field) => (
//                     <Form.Group
//                       className="mb-3 text-start"
//                       controlId={field.controlId}
//                       key={field.controlId}
//                     >
//                       <Form.Label className="fw-semibold">
//                         {field.label}
//                       </Form.Label>
//                       <Form.Control
//                         type={field.type}
//                         placeholder={`Enter ${field.label.toLowerCase()}`}
//                         name={field.controlId}
//                         value={formData[field.controlId]}
//                         onChange={handleInputChange}
//                         required
//                         className="rounded-3 py-2"
//                       />
//                     </Form.Group>
//                   ))}
//                   <div className="d-grid mt-4">
//                     <Button
//                       type="submit"
//                       variant="outline-primary"
//                       className="rounded-pill py-2 fw-bold"
//                     >
//                       Login
//                     </Button>
//                   </div>
//                 </Form>
//                 <div className="text-center mt-4">
//                   <small className="text-muted">
//                     Don’t have an account? <Link to="/asignup">Sign up</Link>
//                   </small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default AdminLogin;




import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Cookies from "js-cookie"; // to manage cookies easily

const commonFields = [
  { controlId: "email", label: "Email", type: "email" },
  { controlId: "password", label: "Password", type: "password" },
];

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const adminToken = Cookies.get("adminJwtToken");

  useEffect(() => {
    if (adminToken) {
      navigate("/admin/all-products");
    }
  }, [adminToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5100/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // important to send and receive cookies
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server response:", data);

        // We assume your backend sets HttpOnly cookies for the JWT token.
        // If backend also sends some non-HttpOnly info (like admin ID), you can store it here:
        if (data.adminId) {
          Cookies.set("adminId", data.adminId); // store adminId in cookie (not secure, but accessible by JS)
        }

        alert("Login Successful");
        navigate("/admin/dashboard");
      } else {
        alert("Email or Password didn't match");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #dfe9f3, #ffffff)",
          padding: "40px 20px",
        }}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card className="shadow border-0 rounded-4">
              <Card.Body className="p-5">
                <h3 className="text-center mb-4 fw-bold text-primary">
                  Admin Login
                </h3>
                <Form onSubmit={handleSubmit}>
                  {commonFields.map((field) => (
                    <Form.Group
                      className="mb-3 text-start"
                      controlId={field.controlId}
                      key={field.controlId}
                    >
                      <Form.Label className="fw-semibold">
                        {field.label}
                      </Form.Label>
                      <Form.Control
                        type={field.type}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        name={field.controlId}
                        value={formData[field.controlId]}
                        onChange={handleInputChange}
                        required
                        className="rounded-3 py-2"
                      />
                    </Form.Group>
                  ))}
                  <div className="d-grid mt-4">
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="rounded-pill py-2 fw-bold"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Don’t have an account? <Link to="/asignup">Sign up</Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLogin;
