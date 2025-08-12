const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middlewares/authMiddleware");
router.post("/createProduct",auth.adminAuthMiddleware, productController.createProduct);
router.get("/getAllProducts",auth.authMiddleware, productController.getAllProducts);
router.get("/:id", auth.authMiddleware, productController.getProductById);
router.put("/:id", auth.authMiddleware, productController.updateProduct);
router.delete("/:id", auth.authMiddleware, productController.deleteProduct);

router.get('/products/:id/image', productController.getProductImageById);
module.exports = router;


