const Order = require('../models/Order');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

let sendOrderEmail = () => {};
try {
  const emailModule = require('../config/email');
  sendOrderEmail = emailModule.sendOrderEmail;
} catch (e) {
  console.log('Email module not available');
}

// @desc    Create new order & Razorpay order
// @route   POST /api/orders
// @access  Public (Guest Checkout) or Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    // Create Razorpay Order
    const options = {
      amount: Math.round(totalPrice * 100), // amount in the smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    try {
      const razorpayOrder = await razorpay.orders.create(options);

      const order = new Order({
        orderItems,
        user: req.user ? req.user._id : null,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentResult: {
          razorpay_order_id: razorpayOrder.id,
        },
      });

      const createdOrder = await order.save();
      res.status(201).json({
        order: createdOrder,
        razorpayOrder: razorpayOrder,
      });
    } catch (error) {
      console.error('ORDER ERROR:', error.name, error.message);
      
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(e => e.message).join(', ');
        return res.status(400).json({ message: messages });
      }
      
      res.status(500).json({ 
        message: 'Order creation failed', 
        error: error.message 
      });
    }
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/orders/verify
// @access  Public
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const order = await Order.findById(orderId);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: razorpay_payment_id,
        status: 'PAID',
        update_time: new Date().toISOString(),
        email_address: order.shippingAddress.email,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      };

      const updatedOrder = await order.save();

      // Send email notification (non-blocking - won't affect order if fails)
      const orderDetails = {
        orderId: updatedOrder._id.toString().slice(-8).toUpperCase(),
        customerName: updatedOrder.shippingAddress.fullName,
        address: `${updatedOrder.shippingAddress.address}, ${updatedOrder.shippingAddress.city}, ${updatedOrder.shippingAddress.state} - ${updatedOrder.shippingAddress.zipCode}`,
        items: updatedOrder.orderItems.map(item => ({
          name: item.name,
          qty: item.qty,
          price: item.price
        })),
        total: updatedOrder.totalPrice,
        paymentMethod: updatedOrder.paymentMethod,
        phone: updatedOrder.shippingAddress.phone,
      };

      // Fire and forget - email sending won't block the response
      sendOrderEmail(updatedOrder.shippingAddress.email, orderDetails).catch(err => {
        console.log('Email notification skipped:', err.message);
      });

      res.json({ message: "Payment verified successfully", order: updatedOrder });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.json(orders);
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.deleteOne();
    res.json({ message: 'Order deleted' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  getMyOrders,
  verifyPayment,
  getOrders,
  updateOrderToDelivered,
  deleteOrder,
};
