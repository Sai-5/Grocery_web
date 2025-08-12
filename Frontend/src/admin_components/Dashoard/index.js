



import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavabar from '../AdminNavbar';
import './style.css'; // Make sure your CSS file has the above styles

const Dashboard = () => {
  const [data, setData] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
          axios.get('http://localhost:5100/api/admin/getAllUsers'),
          axios.get('http://localhost:5100/api/products/getAllProducts'),
          axios.get('http://localhost:5100/api/orders/getAllOrders'),
        ]);

        setData({
          users: Array.isArray(usersResponse.data) ? usersResponse.data.length : 0,
          products: Array.isArray(productsResponse.data) ? productsResponse.data.length : 0,
          orders: Array.isArray(ordersResponse.data) ? ordersResponse.data.length : 0,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-bg">
      <AdminNavabar />
      <Container className="py-5">
        <h2 className="text-center mb-5 fw-bold text-primary">📊 Admin Dashboard</h2>
        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card className="dashboard-card shadow-lg border-0">
              <Card.Body>
                <Card.Title className="fw-semibold">Product Count</Card.Title>
                <Card.Text className="display-6 fw-bold text-success">{data.products}</Card.Text>
                <Link to="/admin/all-products">
                  <Button variant="outline-success" className="w-100 fw-semibold">View Products</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="dashboard-card shadow-lg border-0">
              <Card.Body>
                <Card.Title className="fw-semibold">User Count</Card.Title>
                <Card.Text className="display-6 fw-bold text-info">{data.users}</Card.Text>
                <Link to="/admin/users">
                  <Button variant="outline-info" className="w-100 fw-semibold">View Users</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="dashboard-card shadow-lg border-0">
              <Card.Body>
                <Card.Title className="fw-semibold">Order Count</Card.Title>
                <Card.Text className="display-6 fw-bold text-warning">{data.orders}</Card.Text>
                <Link to="/admin/orders">
                  <Button variant="outline-warning" className="w-100 fw-semibold">View Orders</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="dashboard-card shadow-lg border-0">
              <Card.Body>
                <Card.Title className="fw-semibold">Add Product</Card.Title>
                <div className="pt-3">
                  <Link to="/admin/add-product">
                    <Button variant="success" className="w-100 fw-semibold">+ Add New</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
