const nodemailer = require('nodemailer');

console.log('=== EMAIL MODULE LOADED ===');
console.log('MAIL_USER:', process.env.MAIL_USER);
console.log('ADMIN_EMAIL:', process.env.ADMIN_NOTIFY_EMAIL);

let transporter = null;

const initTransporter = () => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log('❌ Email not configured - missing credentials');
    return null;
  }
  
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  
  console.log('✅ Email transporter ready');
  return transporter;
};

const sendOrderEmail = async (orderDetails) => {
  console.log('\n=== SENDING ORDER EMAIL ===');
  
  if (!transporter) {
    transporter = initTransporter();
  }
  
  if (!transporter) {
    console.log('❌ No transporter - email not sent');
    return false;
  }

  const { orderId, customerName, address, items, total, paymentMethod, phone } = orderDetails;
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || 'reverserituals@gmail.com';

  console.log('To:', adminEmail);
  console.log('Order ID:', orderId);

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

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: adminEmail,
      subject: `New Order - #${orderId} - ₹${total}`,
      html: html
    });
    console.log('✅ Email sent successfully to', adminEmail);
    return true;
  } catch (error) {
    console.log('❌ Email failed:', error.message);
    return false;
  }
};

module.exports = { sendOrderEmail, initTransporter };