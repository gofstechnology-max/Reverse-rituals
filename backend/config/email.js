const nodemailer = require('nodemailer');

console.log('=== EMAIL MODULE LOADED ===');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;
  
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    timeout: 30000
  });
  
  console.log('✅ Email transporter ready');
  return transporter;
};

const sendOrderEmail = (orderDetails) => {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || 'reverserituals@gmail.com';
  console.log('📧 Email to:', adminEmail);
  
  const { orderId, customerName, address, items, total, paymentMethod, phone } = orderDetails;

  const itemsList = items.map(item => 
    `<tr><td>${item.name}</td><td>${item.qty}</td><td>₹${item.price}</td></tr>`
  ).join('');

  const html = `
    <h2>New Order Received! 🎉</h2>
    <p><strong>Order #:</strong> ${orderId}</p>
    <p><strong>Customer:</strong> ${customerName}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Total:</strong> ₹${total}</p>
    <p><strong>Payment:</strong> ${paymentMethod}</p>
    <p><strong>Address:</strong> ${address}</p>
    <h3>Items:</h3>
    <table border="1" cellpadding="5">
      <tr><th>Product</th><th>Qty</th><th>Price</th></tr>
      ${itemsList}
    </table>
  `;

  getTransporter().sendMail({
    from: process.env.MAIL_USER,
    to: adminEmail,
    subject: `New Order - #${orderId} - ₹${total}`,
    html: html
  }, (err, info) => {
    if (err) {
      console.log('❌ Email error:', err.message);
    } else {
      console.log('✅ Email sent! ID:', info.messageId);
    }
  });
  
  return true;
};

module.exports = { sendOrderEmail };