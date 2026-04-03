# Gofs HairCare - Premium E-commerce Ritual

A full-stack e-commerce application for premium Ayurvedic hair care products.

## 🚀 Technology Stack
- **Frontend**: React 19, TailwindCSS 4, Framer Motion, Lucide React
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Payment**: Razorpay Integration (Test Mode)
- **Auth**: JWT Authentication

## 📂 Project Structure
```text
/backend          - Express API, Models, Routes, Controllers
/frontend         - React Vite App, Components, Pages, Context
```

## 🛠️ How to Run

### 1. Backend Setup
```bash
cd backend
npm install
# Update .env with your Razorpay Test Keys
npm run data:import  # Seed the database with products and admin
npm run dev          # Start the API on port 5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev          # Start the website on port 5173
```

## 🔑 Demo Credentials
- **Admin Email**: `greensignaltamil@gmail.com`
- **Admin Password**: `123321`

## ✨ Features
- **Modern Animations**: Powered by Framer Motion for a premium feel.
- **Glassmorphism UI**: Trendy, high-end design aesthetics.
- **Full Checkout Flow**: From cart to Razorpay payment verification.
- **Admin Dashboard**: manage orders and products in real-time.
- **Guest Checkout**: Support for non-logged-in users to buy products.
- **Product Details**: Deep-dive into benefits and ingredients.

---

### ⚠️ Note on Razorpay
I have set the Razorpay Key to a placeholder `rzp_test_YOUR_KEY_HERE` in `frontend/src/pages/CheckoutPage.jsx`. 
Please replace it with your own **Test Key ID** from the Razorpay Dashboard to test the payment flow successfully.
