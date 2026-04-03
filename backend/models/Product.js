const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, default: 'Hair Care' },
  image: { type: String, required: true }, // URL to image
  features: [{ type: String }],
  benefits: [{
    title: { type: String },
    description: { type: String },
    points: [{ type: String }]
  }],
  ingredients: [{
    name: { type: String },
    description: { type: String },
    points: [{ type: String }]
  }],
  usageTips: [{ type: String }],
  countInStock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
