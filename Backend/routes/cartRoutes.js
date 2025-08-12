const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const  auth = require("../middlewares/authMiddleware")
//  const auth = require("../middlewares/authMiddleware");

router.post("/addToCart",auth.authMiddleware, cartController.addToCart);
// Get all items (existing)
router.get("/", auth.authMiddleware, cartController.getCartItems);
// Get items by userId
router.get("/user/:userId", auth.authMiddleware, cartController.getCartItemsByUser);
// Get single cart item by cart id
router.get("/:id",  auth.authMiddleware, cartController.getCartItemById);
// Remove by cart item id
router.delete('/:id',  cartController.removeFromCart);

module.exports = router;

