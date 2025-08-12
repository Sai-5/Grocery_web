const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth= require("../middlewares/authMiddleware");

router.post("/register", adminController.registerAdmin);
router.post("/login",  adminController.loginAdmin);
router.get("/getAllUsers", auth.adminAuthMiddleware, adminController.getAllUsers);
router.delete("/:id",auth.adminAuthMiddleware, adminController.deleteUser);
// router.get("/:userid",  adminController.getUserById);
module.exports = router;



