require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');

console.log('=== EMAIL MODULE LOADED (BREVO API) ===');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();
console.log('✅ Brevo API ready');

const sendOrderEmail = (orderDetails) => {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || 'reverserituals@gmail.com';
  console.log('📧 Sending to:', adminEmail);
  
  const { orderId, customerName, address, items, total, paymentMethod, phone } = orderDetails;

  const itemsList = items.map(item => 
    `<tr><td>${item.name}</td><td>${item.qty}</td><td>₹${item.price}</td></tr>`
  ).join('');

  const html = `
    <h2>New Order #${orderId}</h2>
    <p><strong>Total:</strong> ₹${total}</p>
    <p><strong>Customer:</strong> ${customerName}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Payment:</strong> ${paymentMethod}</p>
    <p><strong>Address:</strong> ${address}</p>
    <table border="1"><tr><th>Product</th><th>Qty</th><th>Price</th></tr>${itemsList}</table>
  `;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = `New Order - #${orderId} - ₹${total}`;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { name: 'Reverse Rituals', email: process.env.MAIL_USER };
  sendSmtpEmail.to = [{ email: adminEmail, name: 'Admin' }];

  transactionalApi.sendTransacEmail(sendSmtpEmail)
    .then((info) => console.log('✅ Email sent!'))
    .catch((error) => console.log('❌ Email error:', error.message));
};

const sendEmail = (toEmail, subject, htmlContent) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = { name: 'Reverse Rituals', email: process.env.MAIL_USER };
  sendSmtpEmail.to = [{ email: toEmail, name: 'Customer' }];

  transactionalApi.sendTransacEmail(sendSmtpEmail)
    .then((info) => console.log('✅ Email sent to:', toEmail))
    .catch((error) => console.log('❌ Email error:', error.message));
};

module.exports = { sendOrderEmail, sendEmail };