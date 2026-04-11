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
  createPaymentForOrder,
} = require('../controllers/orderController');
const { protect, admin, optionalProtect } = require('../middleware/auth');

router.route('/myorders').get(protect, getMyOrders);

// More specific routes first
router.route('/:id/pay').post(optionalProtect, createPaymentForOrder);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id').get(protect, getOrderById).delete(protect, admin, deleteOrder);

router.route('/')
  .post(optionalProtect, addOrderItems)
  .get(protect, admin, getOrders);

router.route('/verify').post(verifyPayment);

module.exports = router;
