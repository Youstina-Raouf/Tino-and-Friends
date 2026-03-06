// Product Model
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: 0,
    },
    category: {
      type: String,
      enum: ['Pastries', 'Sandwiches', 'Bread', 'Beverages', 'Viennoiserie'],
      required: [true, 'Please provide product category'],
    },
    image: {
      type: String,
      required: [true, 'Please provide product image URL'],
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
