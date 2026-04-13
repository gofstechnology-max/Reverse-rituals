require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('=== EMAIL MODULE LOADED (BREVO) ===');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
  }
});

console.log('✅ Brevo transporter ready');

transporter.verify((error) => {
  if (error) console.log('❌ Transporter error:', error.message);
  else console.log('✅ Brevo transporter verified');
});

const sendOrderEmail = (orderDetails) => {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || 'reverserituals@gmail.com';
  console.log('📧 Sending to:', adminEmail);

  const { orderId, customerName, address, items, total, paymentMethod, phone } = orderDetails;

  const itemsList = items.map(item =>
    `<tr><td>${item.name}</td><td>${item.qty}</td><td>₹${item.price}</td></tr>`
  ).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #064e3b, #c5a059); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">🛒 New Order Received!</h1>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #064e3b;">Order #${orderId}</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #064e3b; color: white;">
              <th style="padding: 12px; text-align: left;">Product</th>
              <th style="padding: 12px;">Qty</th>
              <th style="padding: 12px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 18px; color: #c5a059;">₹${total}</td>
            </tr>
          </tfoot>
        </table>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #064e3b; margin-top: 0;">📋 Customer Details</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Payment:</strong> ${paymentMethod}</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <h3 style="color: #064e3b; margin-top: 0;">📍 Shipping Address</h3>
          <p style="margin: 0;">${address}</p>
        </div>
      </div>
      <div style="text-align: center; padding: 20px; color: #666;">
        <p>Reverse Rituals - Premium Hair Care</p>
      </div>
    </body>
    </html>
  `;

  transporter.sendMail({
    from: {
      name: 'Reverse Rituals',
      address: process.env.MAIL_USER || process.env.BREVO_SMTP_LOGIN
    },
    to: adminEmail,
    replyTo: process.env.MAIL_USER || 'reverserituals@gmail.com',
    sender: process.env.MAIL_USER || 'reverserituals@gmail.com',
    subject: `🛒 New Order - #${orderId} - ₹${total}`,
    html: html
  }, (err, info) => {
    if (err) console.log('❌ Email error:', err.message);
    else console.log('✅ Email sent! ID:', info.messageId);
  });
};

const sendEmail = (toEmail, subject, htmlContent) => {
  transporter.sendMail({
    from: {
      name: 'Reverse Rituals',
      address: process.env.MAIL_USER || process.env.BREVO_SMTP_LOGIN
    },
    to: toEmail,
    replyTo: process.env.MAIL_USER || 'reverserituals@gmail.com',
    sender: process.env.MAIL_USER || 'reverserituals@gmail.com',
    subject: subject,
    html: htmlContent
  }, (err, info) => {
    if (err) console.log('❌ Email error:', err.message);
    else console.log('✅ Email sent to:', toEmail);
  });
};

module.exports = { sendOrderEmail, sendEmail };