const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;
  
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS || process.env.MAIL_PASS === 'your_app_password_here') {
    console.log('Email not configured - skipping email notifications');
    return null;
  }
  
  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: process.env.MAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  
  return transporter;
};

const sendOrderEmail = async (toEmail, orderDetails) => {
  const transport = getTransporter();
  if (!transport) return;
  
  const { orderId, customerName, address, items, total, paymentMethod, phone } = orderDetails;

  const itemsList = items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
    </tr>
  `).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #064e3b, #c5a059); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">New Order Received!</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #064e3b; margin-top: 0;">Order #${orderId}</h2>
        
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
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #064e3b; margin-top: 0;">Customer Details</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px;">
          <h3 style="color: #064e3b; margin-top: 0;">Shipping Address</h3>
          <p style="margin: 0;">${address}</p>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>Reverse Rituals - Premium Hair Care</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.MAIL_FROM || 'greensignaltamil@gmail.com',
    to: toEmail, // Send to customer
    cc: process.env.ADMIN_NOTIFY_EMAIL || 'greensignaltamil@gmail.com,ReverseRituals@gmail.com', // CC to admin(s)
    subject: `Your Reverse Rituals Order #${orderId} - ₹${total}`,
    html: htmlContent,
  };

  try {
    console.log(`Attempting to send order email to: ${toEmail}`);
    await transport.sendMail(mailOptions);
    console.log('Order notification email sent successfully to customer and admin');
  } catch (error) {
    console.error('CRITICAL EMAIL ERROR:', error.message);
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check if Gmail App Password is still valid.');
    }
  }
};

module.exports = { sendOrderEmail };