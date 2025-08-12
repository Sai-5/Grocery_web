
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ Component }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('userJwtToken');
//         // const adminToken = localStorage.getItem('adminJwtToken');

//         if (!token ) {
//             navigate('/login');
//         }
//     }, [navigate]);

//     return <Component />;
// };

// export default ProtectedRoute;
















// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = ({ Component }) => {
//   const navigate = useNavigate();
//   const [isVerified, setIsVerified] = useState(false);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const res = await axios.get("http://localhost:5100/api/verifyToken/verify/Auth", {
//           withCredentials: true, // send cookies
//         });

//         if (res.status === 200) {
//           setIsVerified(true); // user is authenticated
//         }
//       } catch (error) {
//         if (error.response) {
//           if (error.response.status === 400 || error.response.status === 401) {
//             console.warn("Invalid or expired token");
//           } else if (error.response.status >= 500) {
//             console.error("Server error while verifying token");
//           }
//         } else {
//           console.error("Network error:", error.message);
//         }
//         navigate("/login");
//       }
//     };

//     verifyToken();
//   }, [navigate]);

//   return isVerified ? <Component /> : null; // render only if verified
// };

// export default ProtectedRoute;




// // src/components/ProtectedRoute.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = ({ Component }) => {
//   const navigate = useNavigate();
//   const [isVerified, setIsVerified] = useState(null);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5100/api/verifyToken/verify/Auth",
//           { withCredentials: true }
//         );
//         if (res.status === 200) {
//           setIsVerified(true);
//         }
//       } catch {
//         setIsVerified(false);
//         navigate("/login");
//       }
//     };
//     verifyToken();
//   }, [navigate]);

//   if (isVerified === null) return <p>Checking authentication...</p>;
//   return isVerified ? <Component /> : null;
// };

// export default ProtectedRoute;












// // src/components/ProtectedRoute.jsx
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = ({ Component, allowedRoles }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAuth, setIsAuth] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5100/api/verifyToken/verify/Auth",
//           { withCredentials: true }
//         );

//         if (res.status === 200) {
//           setUser(res.data.user);
//           // If allowedRoles is passed, check user role
//           if (!allowedRoles || allowedRoles.includes(res.data.user.role)) {
//             setIsAuth(true);
//           }
//         }
//       } catch (err) {
//         setIsAuth(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     verify();
//   }, [allowedRoles]);

//   if (loading) return <p>Checking authentication...</p>;

//   return isAuth ? <Component user={user} /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;









// // src/components/ProtectedRoute.js
// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import axios from "axios";

// function ProtectedRoute({ allowedRoles }) {
//   const [authState, setAuthState] = useState({
//     loading: true,
//     isAuthenticated: false,
//     user: null,
//   });

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5100/api/verifyToken/verify/Auth",
//           { withCredentials: true }
//         );
//         setAuthState({
//           loading: false,
//           isAuthenticated: true,
//           user: data.user,
//         });
//       } catch (err) {
//         setAuthState({ loading: false, isAuthenticated: false, user: null });
//       }
//     };

//     verifyUser();
//   }, []);

//   if (authState.loading) return <div>Loading...</div>;

//   // If not logged in → redirect to login
//   if (!authState.isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If role restriction exists and user doesn't match → redirect
//   if (
//     allowedRoles &&
//     !allowedRoles.includes(authState.user?.role)
//   ) {
//     return <Navigate to="/" replace />;
//   }

//   // If all checks pass → render child route
//   return <Outlet />;
// }

// export default ProtectedRoute;


// // src/components/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const ProtectedRoute = ({ children, allowedRole }) => {
//   const token = Cookies.get("authToken");
//   const user = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null;

//   // No token → redirect to login
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Role check (optional)
//   if (allowedRole && user?.role !== allowedRole) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;





// // src/components/ProtectedRoute.jsx
// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import axios from "axios";
// import { Spinner } from "react-bootstrap";

// function ProtectedRoute({ allowedRoles }) {
//   const [authState, setAuthState] = useState({
//     loading: true,
//     isAuthenticated: false,
//     user: null,
//   });

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5100/api/verifyToken/verify/Auth",
//           { withCredentials: true }
//         );

//         if (data.user) {
//           setAuthState({
//             loading: false,
//             isAuthenticated: true,
//             user: data.user, // { userId, role }
//           });
//         } else {
//           setAuthState({
//             loading: false,
//             isAuthenticated: false,
//             user: null,
//           });
//         }
//       } catch (err) {
//         setAuthState({
//           loading: false,
//           isAuthenticated: false,
//           user: null,
//         });
//       }
//     };

//     verifyUser();
//   }, []);

//   if (authState.loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   if (!authState.isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(authState.user?.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }

// export default ProtectedRoute;





// // src/components/UserProtectedRoute.js
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = ({ children }) => {
//   const [isVerified, setIsVerified] = useState(null);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5100/api/tokenVerify/userTokenVerify",
//           { withCredentials: true } // to send cookies
//         );

//         if (res.data?.message === "Token valid" && res.data?.user?.role === "user") {
//           setIsVerified(true);
//         } else {
//           setIsVerified(false);
//         }
//       } catch (err) {
//         setIsVerified(false);
//       }
//     };

//     verifyToken();
//   }, []);

//   if (isVerified === null) {
//     return <p>Loading...</p>; // or a spinner
//   }

//   return isVerified ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;



// src/components/UserProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const UserProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    isVerified: false,
    error: null
  });
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const userToken = Cookies.get("userJwtToken");
        if (!userToken) {
          setAuthStatus({ loading: false, isVerified: false, error: "No token found" });
          return;
        }

        const res = await axios.get(
          "http://localhost:5100/api/tokenVerify/userTokenVerify",
          { 
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${userToken}`
            }
          }
        );

        if (res.data?.message === "Token valid" && res.data?.user?.role === "user") {
          setAuthStatus({ loading: false, isVerified: true, error: null });
        } else {
          setAuthStatus({ loading: false, isVerified: false, error: "Invalid token" });
          // Clear invalid token
          Cookies.remove("userJwtToken");
        }
      } catch (err) {
        setAuthStatus({ 
          loading: false, 
          isVerified: false, 
          error: err.response?.data?.message || "Authentication failed" 
        });
        Cookies.remove("userJwtToken");
      }
    };

    verifyToken();
  }, [location.pathname]);

  if (authStatus.loading) {
    return <div className="spinner-border text-primary" role="status" />;
  }

  return authStatus.isVerified ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default UserProtectedRoute;