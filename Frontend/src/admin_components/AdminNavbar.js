

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Unavbar = () => {
  const get = localStorage.getItem('user');

  const navLinkStyle = {
    padding: "8px 16px",
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: 500,
    transition: "0.3s ease",
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#16a34a" }} variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link to="/uhome" style={{ color: "white", textDecoration: "none", fontSize: "22px", fontWeight: "bold" }}>
            Grocery Web App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-2">
            <Link to="/Admin/dashboard" style={navLinkStyle}>Dashboard</Link>
            <Link to="/admin/users" style={navLinkStyle}>Users</Link>
            <Link to="/admin/all-products" style={navLinkStyle}>Products</Link>
            <Link to="/admin/add-product" style={navLinkStyle}>Add Product</Link>
            <Link to="/admin/orders" style={navLinkStyle}>Orders</Link>
            <Link to="/" style={{ ...navLinkStyle, backgroundColor: "#dc2626", borderRadius: "6px", padding: "8px 20px" }}>
              Logout
            </Link>
            {/* <span style={{ color: "white", fontSize: "14px", marginLeft: "10px" }}>({JSON.parse(get).name})</span> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unavbar;
