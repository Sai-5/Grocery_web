// // middlewares/authMiddleware.js
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {

//   // console.log("coo",req.cookies)

//   const token = req.cookies.userJwtToken
//   console.log(token)
//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded)
//     req.user = decoded; // Attach decoded payload to req.user
//     next()
//   } catch (error) {
//     return res.status(401).json({ message: "Token is not valid" });
    
//   }
// };

// module.exports = authMiddleware;







// const adminAuthMiddleware = (req, res, next) => {

//   console.log("coo",req.cookies)

//   const token = req.cookies.adminJwtToken

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
//     console.log(decoded)
//     req.user = decoded; // Attach decoded payload to req.user
//     next()
//   } catch (error) {
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = authMiddleware;







// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.userJwtToken;
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};









const adminAuthMiddleware = (req, res, next) => {
  console.log("coo", req.cookies);

  const token = req.cookies.adminJwtToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// ✅ Export both
module.exports = {
  authMiddleware,
  adminAuthMiddleware
};
