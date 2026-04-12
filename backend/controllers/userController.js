const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Send email helper (using Gmail SMTP)
const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.log('Email config missing - MAIL_USER or MAIL_PASS not set');
      return false;
    }
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html,
    });
    console.log('Email sent successfully to:', to);
    return true;
  } catch (error) {
    console.log('Email send failed:', error.message);
    return false;
  }
};

// @desc    Send OTP for password reset
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(404).json({ message: 'User not found with this email' });
    return;
  }
  
  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  
  // Store OTP with 10 minute expiry
  otpStore.set(email, {
    otp,
    expires: Date.now() + 10 * 60 * 1000
  });
  
  // Send OTP via email
  const emailSent = await sendEmail(
    email,
    'Password Reset OTP - Reverse Rituals',
    `<div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px;">
      <h2 style="color: #064e3b;">Reverse Rituals - Password Reset</h2>
      <p>Your OTP for password reset is:</p>
      <h1 style="color: #c5a059; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
      <p style="color: #666; font-size: 14px;">This OTP is valid for 10 minutes.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
    </div>`
  );
  
  if (emailSent) {
    res.json({ message: 'OTP sent to your email' });
  } else {
    res.status(500).json({ message: 'Failed to send OTP. Please check your email.' });
  }
};

// @desc    Verify OTP and reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  const stored = otpStore.get(email);
  
  if (!stored) {
    res.status(400).json({ message: 'No OTP requested for this email' });
    return;
  }
  
  if (Date.now() > stored.expires) {
    otpStore.delete(email);
    res.status(400).json({ message: 'OTP expired. Please request new OTP' });
    return;
  }
  
  if (stored.otp !== otp) {
    res.status(400).json({ message: 'Invalid OTP' });
    return;
  }
  
  const user = await User.findOne({ email });
  
  if (user) {
    user.password = newPassword;
    await user.save();
    otpStore.delete(email);
    res.json({ message: 'Password reset successful' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: isAdmin || false,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Make user admin
// @route   PUT /api/users/:id/admin
// @access  Private/Admin
const makeUserAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = true;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.shippingAddress) {
      user.shippingAddress = req.body.shippingAddress;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      shippingAddress: updatedUser.shippingAddress,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  makeUserAdmin,
  updateUserProfile,
  forgotPassword,
  resetPassword,
};
