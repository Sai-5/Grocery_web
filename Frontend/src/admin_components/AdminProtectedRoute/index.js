// import React, { useEffect } from 'react';
// import Cookies from 'js-cookies';
// import { useNavigate } from 'react-router-dom';

// const AdminProtectedRoute = (props) => {
//     const { Component } = props
//     const navigate = useNavigate()
//     useEffect(() => {
//         const adminToken = localStorage.getItem('adminJwtToken')
//         if (!adminToken) {
//             navigate('/alogin')
//         }
//     })
//     return <Component />

// };

// export default AdminProtectedRoute;
















// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdminProtectedRoute = ({ Component }) => {
//   const navigate = useNavigate();
//   const [isVerified, setIsVerified] = useState(false);

//   useEffect(() => {
//     const verifyAdminToken = async () => {
//       try {
//         const res = await axios.get("http://localhost:5100/api/admin/verify", {
//           withCredentials: true, // Send cookies to backend
//         });

//         if (res.status === 200) {
//           setIsVerified(true);
//         }
//       } catch (error) {
//         if (error.response) {
//           if (error.response.status === 400 || error.response.status === 401) {
//             console.warn("Admin token invalid or expired");
//             navigate("/alogin");
//           } else if (error.response.status >= 500) {
//             console.error("Server error while verifying admin token");
//             navigate("/alogin");
//           }
//         } else {
//           console.error("Network error:", error.message);
//           navigate("/alogin");
//         }
//       }
//     };

//     verifyAdminToken();
//   }, [navigate]);

//   return isVerified ? <Component /> : null; // Render only after verification
// };

// export default AdminProtectedRoute;





// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const AdminProtectedRoute = ({ children }) => {
//   const [isAdmin, setIsAdmin] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get("http://localhost:5100/api/verifyToken/verify/Auth", {
//           withCredentials: true,
//         });
//         if (res.data.role === "admin") {
//           setIsAdmin(true);
//         } else {
//           setIsAdmin(false);
//         }
//       } catch (error) {
//         setIsAdmin(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (isAdmin === null) {
//     return <p>Loading...</p>;
//   }

//   return isAdmin ? children : <Navigate to="/admin/login" />;
// };

// export default AdminProtectedRoute;




// ;

// import { Navigate } from "react-router-dom";

// const AdminProtectedRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default AdminProtectedRoute
















// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// // import API from "../axiosInstance";

// const AdminProtectedRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     const verifyAdmin = async () => {
//       try {
//         await API.get("http://localhost:5100/api/tokenVerify/adminTokenVerify"); // backend will check token
//         setIsAuthorized(true);
//       } catch (err) {
//         setIsAuthorized(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     verifyAdmin();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   return isAuthorized ? children : <Navigate to="/login" replace />;
// };

// export default AdminProtectedRoute;



// src/admin_components/AdminProtectedRoute/index.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import API from "../../axiosInstance"; // ✅ Correct path to axios instance

const AdminProtectedRoute = ({ Component }) => {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await API.get("http://localhost:5100/api/tokenVerify/adminTokenVerify", { withCredentials: true });
        if (res.status === 200) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (err) {
        setIsVerified(false);
      }
    };
    verifyToken();
  }, []);

  if (isVerified === null) {
    return <p>Loading...</p>;
  }

  return isVerified ? <Component /> : <Navigate to="/alogin" />;
};

export default AdminProtectedRoute;

