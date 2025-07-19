const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
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

    await Users.updateOne(
      { id: req.user.id },
      { $set: { cartData: {} } },
      { new: true }
    );
    num_products = await Product.countDocuments();
    await Users.findOneAndUpdate(
      { id: req.user.id },
      {
        $set: {
          cartData: Object.fromEntries(
            Array.from({ length: num_products }, (_, i) => [i + 1, 0])
          ),
        },
      },
      { new: true }
    );
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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const removeOrder = async (req, res) => {
  await Order.findOneAndDelete({ id: req.body.id });
  console.log("Order Removed");
  res.json({
    success: true,
    id: req.body.id,
  });
};

const modifyOrder = async (req, res) => {
  const { id, ...fields } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ success: false, error: "Order id required" });

  Object.keys(fields).forEach((key) => {
    if (fields[key] === undefined || fields[key] === "") delete fields[key];
  });

  try {
    const updated = await Order.findOneAndUpdate(
      { id: Number(id) },
      { $set: fields },
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ success: false, error: "Order not found" });
    res.json({ success: true, order: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

const getSingleOrder = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid order id" });
  const order = await Order.findOne({ id });
  if (!order) return res.status(404).json({ error: "order not found" });
  res.json(order);
};

module.exports = {
  createOrder,
  getAllOrders,
  removeOrder,
  modifyOrder,
  getSingleOrder,
};
