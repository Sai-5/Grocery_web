

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require("../middlewares/authMiddleware");
router.get('/allCategories',auth.authMiddleware, categoryController.getAllCategories);
router.post('/createCategory', auth.authMiddleware, categoryController.createCategory);
// router.put('/updateCategory/:id', categoryController.updateCategory);
// router.delete('/deleteCategory/:id', categoryController.deleteCategory);

module.exports = router;



