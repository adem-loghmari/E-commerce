const Users = require("../models/UsersModel");
const Product = require("../models/ProductModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const signupUser = async (req, res) => {
  try {
    const existing = await Users.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ success: false, errors: "existing user found with same email address" });
    }

    const num_products = await Product.countDocuments();
    const cart = {};
    for (let i = 0; i < num_products; i++) cart[i] = 0;

    const lastUser = await Users.findOne().sort({ id: -1 });
    const id = lastUser ? lastUser.id + 1 : 1;

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const user = new Users({
      id,
      name: req.body.username || req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone || "",
      cartData: cart,
    });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ success: true, token, name: user.name });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, errors: "User already exists" });
    }
    res.status(500).json({ success: false, errors: "Error during signup. Please try again." });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.json({ success: false, errors: "Wrong Email" });

    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passCompare) return res.json({ success: false, errors: "Wrong Password" });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ success: true, token, name: user.name });
  } catch {
    res.status(500).json({ success: false, errors: "Login failed. Please try again." });
  }
};

const removeUser = async (req, res) => {
  try {
    if (!req.body.id) return res.status(400).json({ success: false, error: "User id required" });
    const deleted = await Users.findOneAndDelete({ id: req.body.id });
    if (!deleted) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, id: req.body.id });
  } catch {
    res.status(500).json({ success: false, error: "Failed to remove user" });
  }
};

const addToCart = async (req, res) => {
  try {
    const userData = await Users.findOne({ id: req.user.id });
    if (!userData) return res.status(404).json({ success: false, error: "User not found" });

    userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
    await Users.findOneAndUpdate({ id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update cart" });
  }
};

const removefromcart = async (req, res) => {
  try {
    const userData = await Users.findOne({ id: req.user.id });
    if (!userData) return res.status(404).json({ success: false, error: "User not found" });

    const current = userData.cartData[req.body.itemId] || 0;
    if (current <= 0) return res.status(400).json({ success: false, error: "Item not in cart" });

    userData.cartData[req.body.itemId] = current - 1;
    await Users.findOneAndUpdate({ id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await Users.findOne({ id: req.user.id });
    if (!userData) return res.status(404).json({ success: false, error: "User not found" });
    res.json(userData.cartData);
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch cart" });
  }
};

const updateProfile = async (req, res) => {
  const id = req.user.id;
  if (!id) return res.status(400).json({ success: false, error: "User id required" });

  const fields = { ...req.body };
  Object.keys(fields).forEach((key) => {
    if (fields[key] === undefined || fields[key] === "") delete fields[key];
  });

  try {
    const updated = await Users.findOneAndUpdate(
      { id: Number(id) },
      { $set: fields },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, user: updated });
  } catch {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) return res.status(400).json({ error: "User id required" });
    const user = await Users.findOne({ id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = {
  removeUser,
  signupUser,
  loginUser,
  getAllUsers,
  addToCart,
  removefromcart,
  getCart,
  updateProfile,
  getUser,
};
