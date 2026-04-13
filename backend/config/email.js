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
  const templatePath = path.join(__dirname, '..', '..', `${templateName}.html`);
  let html = fs.readFileSync(templatePath, 'utf8');

  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, value);
  }

  if (data.items) {
    const itemsHtml = data.items.map(item => `
      <tr>
        <td style="padding:16px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="60" valign="top">
                <img src="${item.image}" alt="${item.name}" width="60" height="60" style="display:block;border-radius:6px;object-fit:cover;">
              </td>
              <td valign="top" style="padding-left:16px;">
                <p style="margin:0;font-size:15px;font-weight:500;color:#111827;">${item.name}</p>
                <p style="margin:4px 0 0;color:#6b7280;font-size:14px;">Qty: ${item.quantity} ${item.variant ? '| ' + item.variant : ''}</p>
              </td>
              <td align="right" valign="top" style="color:#111827;font-size:15px;font-weight:500;">
                $${item.price}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `).join('');
    html = html.replace(/{{#each order_items}}[\s\S]*{{\/each}}/, itemsHtml);
  }

  return html;
}

const sendOrderEmail = (orderDetails) => {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || 'reverserituals@gmail.com';
  console.log('📧 Sending order confirmation to:', adminEmail);
  
  const { orderId, customerName, address, items, total, paymentMethod, phone, email } = orderDetails;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const itemsData = items.map(item => ({
    name: item.name,
    quantity: item.qty,
    price: item.price,
    image: item.image || 'https://via.placeholder.com/60x60?text=Product'
  }));

  const orderItemsHtml = itemsData.map(item => `
    <tr>
      <td style="padding:16px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="60" valign="top">
              <img src="${item.image}" alt="${item.name}" width="60" height="60" style="display:block;border-radius:6px;object-fit:cover;">
            </td>
            <td valign="top" style="padding-left:16px;">
              <p style="margin:0;font-size:15px;font-weight:500;color:#111827;">${item.name}</p>
              <p style="margin:4px 0 0;color:#6b7280;font-size:14px;">Qty: ${item.quantity}</p>
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
    shipping: 0,
    tax: 0,
    discount: '',
    total: total,
    delivery_date: deliveryDateStr,
    shipping_name: customerName,
    shipping_address: address.split(', ')[0] || address,
    shipping_city: address.split(', ')[1] || '',
    shipping_state: address.split(', ')[2] || '',
    shipping_zip: address.split(', ')[3] || '',
    track_order_url: process.env.TRACK_ORDER_URL || '#',
    support_url: process.env.SUPPORT_URL || 'mailto:support@reverserituals.com',
    year: new Date().getFullYear(),
    order_items_html: orderItemsHtml
  });

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = `Order Confirmed - #${orderId}`;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { name: 'Reverse Rituals', email: process.env.MAIL_USER };
  sendSmtpEmail.to = [{ email: adminEmail, name: 'Admin' }];

  transactionalApi.sendTransacEmail(sendSmtpEmail)
    .then((info) => console.log('✅ Order email sent!'))
    .catch((error) => console.log('❌ Email error:', error.message));
};

const sendPasswordResetEmail = (toEmail, name, otp) => {
  const html = loadTemplate('forgot-password', {
    logo_url: process.env.BRAND_LOGO || 'https://via.placeholder.com/120x40?text=LOGO',
    brand_name: process.env.BRAND_NAME || 'Reverse Rituals',
    customer_name: name,
    otp: otp,
    support_url: process.env.SUPPORT_URL || 'mailto:support@reverserituals.com',
    year: new Date().getFullYear()
  });

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = 'Reset Your Password';
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { name: 'Reverse Rituals', email: process.env.MAIL_USER };
  sendSmtpEmail.to = [{ email: toEmail, name: name }];

  return transactionalApi.sendTransacEmail(sendSmtpEmail)
    .then((info) => {
      console.log('✅ Password reset email sent to:', toEmail);
      return true;
    })
    .catch((error) => {
      console.log('❌ Email error:', error.message);
      return false;
    });
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

module.exports = { sendOrderEmail, sendEmail, sendPasswordResetEmail };