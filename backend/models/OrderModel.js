const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
  id: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  user_phone: {
    type: String,
    required: true,
  },
  cartSnapshot: {
    type: Map,
    of: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: "US" },
  },
  status: {
    type: String,
    enum: ["pending", "completed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "paypal"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order;
