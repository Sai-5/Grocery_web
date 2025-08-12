import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../Header';

// Styled component for layout
const Container = styled.div`
  padding: 20px;
  margin-top: 10vh;
  text-align: start;
`;

const MyOrders = () => {
  const userId = localStorage.getItem('userId'); // ✅ Get from localStorage
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userId) return; // prevent API call if userId is missing
    axios
      .get(`http://localhost:5100/api/orders/${userId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);

  return (
    <div>
      <Header />
      <Container>
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">📦 My Orders</h1>

        {orders.filter(order => order.status !== 'Delivered').length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No pending orders.</p>
        ) : (
          <ul className="space-y-5">
            {orders.map((order) =>
              order.status !== 'Delivered' ? (
                <li
                  key={order._id}
                  className="border rounded-lg shadow-sm p-5 bg-white hover:shadow-md transition-all"
                >
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold text-gray-800">Order ID:</span> {order._id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Name:</span> {order.firstname} {order.lastname}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Phone:</span> {order.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Date:</span> {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Price:</span> ${order.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Status:</span> <span className="text-yellow-600">{order.status}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Payment Method:</span> {order.paymentMethod}
                  </p>
                </li>
              ) : null
            )}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default MyOrders;



















