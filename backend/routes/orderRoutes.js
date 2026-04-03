const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  verifyPayment,
  getOrders,
  updateOrderToDelivered,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, admin, optionalProtect } = require('../middleware/auth');

router.route('/myorders').get(protect, getMyOrders);

router.route('/')
  .post(optionalProtect, addOrderItems)
  .get(protect, admin, getOrders);

router.route('/verify').post(verifyPayment);

router.route('/:id').get(protect, getOrderById).delete(protect, admin, deleteOrder);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
