const nodemailer = require('nodemailer');

console.log('=== EMAIL MODULE LOADED ===');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  timeout: 10000 // 10 second timeout
});

console.log('✅ Email transporter ready for:', process.env.MAIL_USER);

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

  // Use setTimeout to make it truly non-blocking
  setTimeout(() => {
    transporter.sendMail({
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
  }, 100); // Small delay to let response go first

  console.log('📧 Email queued');
  return true;
};

module.exports = { sendOrderEmail };