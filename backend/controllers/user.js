const Users = require("../models/UsersModel");
const Product = require("../models/ProductModel");
const jwt = require("jsonwebtoken");

// Get all users with /allusers
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// signup user with /signup
const signupUser = async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address",
    });
  }
  let num_products = await Product.countDocuments();
  let cart = {};
  for (let i = 0; i < num_products; i++) {
    cart[i] = 0;
  }
  let users = await Users.find({});
  let id;
  if (users.length > 0) {
    let last_user_array = users.slice(-1);
    let last_user = last_user_array[0];
    id = last_user.id + 1;
  } else {
    id = 1;
  }
  const user = new Users({
    id: id,
    name: req.body.username || req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token, name: user.name });
};

// login user with /login
const loginUser = async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token, name: user.name });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email" });
  }
};

//remove user with /removeuser
const removeUser = async (req, res) => {
  await Users.findOneAndDelete({ id: req.body.id });
  console.log("User Removed");
  res.json({
    success: true,
    id: req.body.id,
  });
};

//add to cart with /addtocart
const addToCart = async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
};

//remove from cart with /removefromcart
const removefromcart = async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
      { id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Removed");
  }
};

//getCart with /getcart
const getCart = async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ id: req.user.id });
  res.json(userData.cartData);
};

//update profile
const updateProfile = async (req, res) => {
  const id = req.user.id;
  const { ...fields } = req.body;
  if (!id)
    return res.status(400).json({ success: false, error: "User id required" });

  // Remove undefined fields so only changed fields are updated
  Object.keys(fields).forEach((key) => {
    if (fields[key] === undefined || fields[key] === "") delete fields[key];
  });

  try {
    const updated = await Users.findOneAndUpdate(
      { id: Number(id) },
      { $set: fields },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

const getUser = async (req, res) => {
  const id = req.user.id;
  if (!id) return res.status(400).json({ error: "User id required" });
  const user = await Users.findOne({ id });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
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
