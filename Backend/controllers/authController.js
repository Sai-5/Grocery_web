const models = require("../models/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

exports.registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    if (!username) return res.status(400).send("Username is required");

    const userExists = await models.Users.findOne({ username });
    if (userExists) return res.status(400).send("Username already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new models.Users({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};


// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await models.Users.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET || "mysecretkey",
//       { expiresIn: "1d" }
//     );

//     // Set token in cookie
//     res.cookie("userJwtToken", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     }); 

//     res.json({
//       message: "Login successful",
//       user: {
//         _id: user._id,
//         firstname: user.firstname,
//         email: user.email,
        
//       }, userJwtToken: token, 

//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };





exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await models.Users.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role || "user" },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1d" }
    );

    // Set token in HTTP-only cookie
    res.cookie("userJwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send user info in response
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstname: user.firstname,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
