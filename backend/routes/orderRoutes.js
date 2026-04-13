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

// Test endpoint FIRST - POST /api/orders/test-email
router.post('/test-email', (req, res) => {
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: process.env.MAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const testOrderDetails = {
    orderId: 'TEST123',
    customerName: 'Test Customer',
    address: '123 Test Street, Mumbai, Maharashtra - 400001',
    items: [
      { name: 'Hair Oil', qty: 2, price: 500 },
      { name: 'Shampoo', qty: 1, price: 350 }
    ],
    total: 1350,
    paymentMethod: 'Razorpay',
    phone: '9876543210'
  };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #064e3b;">Test Order Email</h1>
      <p>This is a test email from Reverse Rituals.</p>
      <p><strong>Order ID:</strong> ${testOrderDetails.orderId}</p>
      <p><strong>Customer:</strong> ${testOrderDetails.customerName}</p>
      <p><strong>Total:</strong> ₹${testOrderDetails.total}</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.MAIL_FROM || 'reverserituals@gmail.com',
    to: process.env.ADMIN_NOTIFY_EMAIL || 'reverserituals@gmail.com',
    subject: 'Test Email - Reverse Rituals',
    html: htmlContent,
  };

  transporter.sendMail(mailOptions)
    .then(info => {
      console.log('Test email sent:', info.messageId);
      res.json({ success: true, messageId: info.messageId });
    })
    .catch(error => {
      console.error('Test email error:', error.message);
      res.status(500).json({ success: false, error: error.message });
    });
});

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
