const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require("../middlewares/authMiddleware");
router.post('/createOrder',auth.authMiddleware, orderController.createOrder);
router.get('/getAllOrders',auth.adminAuthMiddleware, orderController.getAllOrders);
router.get('/:userId',auth.authMiddleware, orderController.getOrdersByUser);
router.put('/:id', auth.adminAuthMiddleware, orderController.updateOrderStatus);
router.delete('/:id',auth.adminAuthMiddleware, orderController.cancelOrder);

module.exports = router;


