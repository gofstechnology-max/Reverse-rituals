require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');
const fs = require('fs');
const path = require('path');

console.log('=== EMAIL MODULE LOADED (BREVO API) ===');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();
console.log('✅ Brevo API ready');

function loadTemplate(templateName, data) {
  const templatePath = path.join(__dirname, '..', `${templateName}.html`);
  console.log('Loading template from:', templatePath);
  
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Template not found:', templatePath);
    throw new Error(`Template not found: ${templatePath}`);
  }
  
  let html = fs.readFileSync(templatePath, 'utf8');
  console.log('Template loaded, length:', html.length);

  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, value);
  }

  return html;
}

const sendOrderEmail = async (orderDetails) => {
  try {
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || 'reverserituals@gmail.com';
    console.log('📧 Sending order confirmation for:', orderDetails.orderId);
    
    const { orderId, customerName, address, items, total, email } = orderDetails;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const orderItemsHtml = items.map(item => `
      <tr>
        <td style="padding:16px;border-bottom:1px solid #eee;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="60" valign="top">
                <img src="${item.image || 'https://via.placeholder.com/60x60?text=Product'}" alt="${item.name}" width="60" height="60" style="display:block;border-radius:6px;object-fit:cover;">
              </td>
              <td valign="top" style="padding-left:16px;">
                <p style="margin:0;font-size:15px;font-weight:500;color:#111827;">${item.name}</p>
                <p style="margin:4px 0 0;color:#6b7280;font-size:14px;">Qty: ${item.qty}</p>
              </td>
              <td align="right" valign="top" style="color:#111827;font-size:15px;font-weight:500;">
                ₹${item.price}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `).join('');

    const html = loadTemplate('order-confirmation', {
      logo_url: process.env.BRAND_LOGO || 'https://via.placeholder.com/140x40?text=LOGO',
      brand_name: process.env.BRAND_NAME || 'Reverse Rituals',
      order_number: orderId,
      customer_name: customerName,
      subtotal: total,
      shipping: 'Free',
      tax: 0,
      total: total,
      delivery_date: deliveryDateStr,
      shipping_name: customerName,
      shipping_address: address,
      shipping_city: '',
      shipping_state: '',
      shipping_zip: '',
      track_order_url: process.env.TRACK_ORDER_URL || '#',
      support_url: process.env.SUPPORT_URL || 'mailto:support@reverserituals.com',
      year: new Date().getFullYear(),
      order_items_html: orderItemsHtml
    });

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = `Order Confirmed - #${orderId}`;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { name: 'Reverse Rituals', email: process.env.MAIL_USER };
    
    // Send to customer if email provided, otherwise just admin
    if (email) {
      sendSmtpEmail.to = [
        { email: adminEmail, name: 'Admin' },
        { email: email, name: customerName }
      ];
      console.log('📧 Sending to both admin AND customer:', email);
    } else {
      sendSmtpEmail.to = [{ email: adminEmail, name: 'Admin' }];
      console.log('📧 No customer email, sending to admin only');
    }

    const result = await transactionalApi.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Order email sent!', result);
    return true;
  } catch (error) {
    console.log('❌ Order email error:', error.message);
    return false;
  }
};

const sendPasswordResetEmail = async (toEmail, name, otp) => {
  try {
    console.log('📧 Sending password reset to:', toEmail);
    
    const html = loadTemplate('forgot-password', {
      logo_url: process.env.BRAND_LOGO || 'https://via.placeholder.com/120x40?text=LOGO',
      brand_name: process.env.BRAND_NAME || 'Reverse Rituals',
      customer_name: name,
      otp: otp,
      support_url: process.env.SUPPORT_URL || 'mailto:support@reverserituals.com',
      year: new Date().getFullYear()
    });

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = 'Reset Your Password - OTP';
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { name: 'Reverse Rituals', email: process.env.MAIL_USER };
    sendSmtpEmail.to = [{ email: toEmail, name: name }];

    const result = await transactionalApi.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Password reset email sent!', result);
    return true;
  } catch (error) {
    console.log('❌ Password reset email error:', error.message);
    return false;
  }
};

const sendEmail = async (toEmail, subject, htmlContent) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { name: 'Reverse Rituals', email: process.env.MAIL_USER };
    sendSmtpEmail.to = [{ email: toEmail, name: 'Customer' }];

    const result = await transactionalApi.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Email sent to:', toEmail, result);
    return true;
  } catch (error) {
    console.log('❌ Email error:', error.message);
    return false;
  }
};

module.exports = { sendOrderEmail, sendEmail, sendPasswordResetEmail };
