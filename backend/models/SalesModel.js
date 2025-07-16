const mongoose = require('mongoose');

const Sales = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  products: [{
    productId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "shipped", "delivered", "cancelled"],
    default: "completed",
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "paypal", "cash", "bank_transfer"],
    required: true,
  },
});

module.exports = mongoose.model('Sale', Sales);