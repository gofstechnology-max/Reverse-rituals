require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

transporter.sendMail({
  from: process.env.MAIL_USER,
  to: process.env.ADMIN_NOTIFY_EMAIL,
  subject: 'Test - Backend Config',
  html: '<h1>Testing with reverserituals@gmail.com</h1><p>If you receive this, email is working!</p>'
}, (error, info) => {
  if (error) {
    console.log('FAILED:', error.message);
  } else {
    console.log('SUCCESS! Email sent to:', process.env.ADMIN_NOTIFY_EMAIL);
  }
});