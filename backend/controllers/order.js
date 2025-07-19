const Order = require("../models/OrderModel");
const Users = require("../models/UsersModel");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  try {
    const { user, cartSnapshot, total, shippingAddress, paymentMethod } =
      req.body;

    // Generate a simple ID (you might want to use a more robust solution)
    let orders = await Order.find({});
    let id;
    if (orders.length > 0) {
      let last_user_array = orders.slice(-1);
      let last_user = last_user_array[0];
      id = last_user.id + 1;
    } else {
      id = 1;
    }

    let userData = await Users.findOne({ id: req.user.id });
    const newOrder = new Order({
      id,
      user: userData._id, // Use the newly created ObjectId
      user_name: userData.name,
      user_id: userData.id,
      cartSnapshot,
      total,
      shippingAddress,
      paymentMethod,
      status: "pending",
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
};
