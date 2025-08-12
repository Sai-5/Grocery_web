const jwt = require("jsonwebtoken");

// // ✅ Verify Admin
// const verifyAdmin = (req, res, next) => {
//     const token = req.cookies.adminJwtToken;
//     if (!token) {
//         return res.status(401).json({ message: "No admin token provided" });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
//         // if (decoded.role !== "admin") {
//         //     return res.status(403).json({ message: "Not authorized as admin" });
//         // }
//         req.admin = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid or expired admin token" });
//     }
// };





// app.get("/adminTokenVerify", (req, res) => {
//   try {
//     const token = req.cookies.adminJwtToken;
//     if (!token) {
//       return res.status(401).json({ message: "No token found" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ message: "Token valid", admin: decoded });
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token", error: error.message });
//   }
// });




// const verifyAdmin = (req, res, next) => {
//   try {
//     const token = req.cookies.adminJwtToken;
//     if (!token) {
//       return res.status(401).json({ message: "No token found" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Optional: check if role is 'admin'
//     if (decoded.role && decoded.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Admins only." });
//     }

//     req.admin = decoded; // Attach admin info to request
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token", error: error.message });
//   }
// };





const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies.adminJwtToken;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    if (decoded.role && decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};










const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.userJwtToken;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role && decoded.role !== "user") {
      return res.status(403).json({ message: "Access denied. user only." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};




 module.exports = { verifyAdmin, verifyUser };



















// // ✅ Verify User
// const verifyUser = (req, res, next) => {
//     const token = req.cookies?.userJwtToken;
//     if (!token) {
//         return res.status(401).json({ message: "No user token provided" });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.role !== "user") {
//             return res.status(403).json({ message: "Not authorized as user" });
//         }
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid or expired user token" });
//     }
// };

