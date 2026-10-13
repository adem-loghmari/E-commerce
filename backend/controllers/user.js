const Users = require("../models/UsersModel");
const Order = require("../models/OrderModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isNonEmptyString, isEmail, isPositiveInt } = require("../utils/validate");

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 72; // bcrypt ignores anything past 72 bytes
const MAX_CART_QUANTITY = 99;
const TOKEN_TTL = "7d";

const signToken = (user) =>
  jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: TOKEN_TTL });

const isValidPassword = (v) =>
  typeof v === "string" && v.length >= MIN_PASSWORD_LENGTH && v.length <= MAX_PASSWORD_LENGTH;

// Never send the password hash to a client.
const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  date: user.date,
});

const getAllUsers = async (req, res) => {
  try {
    const [users, totals] = await Promise.all([
      Users.find({}, { password: 0, cartData: 0 }).lean(),
      Order.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: "$user_id", spent: { $sum: "$total" } } },
      ]),
    ]);
    const spentByUser = new Map(totals.map((t) => [t._id, t.spent]));
    res.status(200).json(users.map((u) => ({ ...u, spent: spentByUser.get(u.id) || 0 })));
  } catch {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const signupUser = async (req, res) => {
  try {
    const name = req.body.username || req.body.name;
    const { email, password, phone } = req.body;

    if (!isNonEmptyString(name, 80)) {
      return res.status(400).json({ success: false, errors: "Please enter your name" });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ success: false, errors: "Please enter a valid email address" });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        errors: `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters`,
      });
    }
    if (phone !== undefined && phone !== "" && !isNonEmptyString(phone, 30)) {
      return res.status(400).json({ success: false, errors: "Please enter a valid phone number" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await Users.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ success: false, errors: "existing user found with same email address" });
    }

    const lastUser = await Users.findOne().sort({ id: -1 });
    const id = lastUser ? lastUser.id + 1 : 1;

    const user = new Users({
      id,
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, SALT_ROUNDS),
      phone: phone ? phone.trim() : "",
      cartData: {},
    });
    await user.save();

    res.json({ success: true, token: signToken(user), name: user.name });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, errors: "User already exists" });
    }
    res.status(500).json({ success: false, errors: "Error during signup. Please try again." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Type checks also stop query-operator objects such as { "$ne": null } from reaching MongoDB.
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ success: false, errors: "Email and password are required" });
    }

    const trimmed = email.trim();
    const user = await Users.findOne({ email: { $in: [trimmed, trimmed.toLowerCase()] } });
    // Same message for both cases so the response does not reveal which emails are registered.
    const passCompare = user ? await bcrypt.compare(password, user.password) : false;
    if (!passCompare) {
      return res.json({ success: false, errors: "Incorrect email or password" });
    }

    res.json({ success: true, token: signToken(user), name: user.name });
  } catch {
    res.status(500).json({ success: false, errors: "Login failed. Please try again." });
  }
};

const removeUser = async (req, res) => {
  try {
    const id = Number(req.body.id);
    if (!isPositiveInt(id)) return res.status(400).json({ success: false, error: "User id required" });
    const deleted = await Users.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, id });
  } catch {
    res.status(500).json({ success: false, error: "Failed to remove user" });
  }
};

// Cart updates run as single atomic pipeline updates so rapid clicks cannot overwrite each other.
const cartQuantity = (itemId) => ({ $ifNull: [`$cartData.${itemId}`, 0] });

const addToCart = async (req, res) => {
  try {
    const itemId = Number(req.body.itemId);
    if (!isPositiveInt(itemId)) return res.status(400).json({ success: false, error: "Invalid product id" });
    const count = isPositiveInt(req.body.count) ? Math.min(req.body.count, MAX_CART_QUANTITY) : 1;

    const result = await Users.updateOne({ id: req.user.id }, [
      { $set: { [`cartData.${itemId}`]: { $min: [MAX_CART_QUANTITY, { $add: [cartQuantity(itemId), count] }] } } },
    ]);
    if (!result.matchedCount) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update cart" });
  }
};

const removefromcart = async (req, res) => {
  try {
    const itemId = Number(req.body.itemId);
    if (!isPositiveInt(itemId)) return res.status(400).json({ success: false, error: "Invalid product id" });
    // removeAll clears the whole line; otherwise one unit is removed.
    const next = req.body.removeAll === true ? 0 : { $max: [0, { $subtract: [cartQuantity(itemId), 1] }] };

    const result = await Users.updateOne({ id: req.user.id }, [{ $set: { [`cartData.${itemId}`]: next } }]);
    if (!result.matchedCount) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await Users.findOne({ id: req.user.id });
    if (!userData) return res.status(404).json({ success: false, error: "User not found" });
    res.json(userData.cartData || {});
  } catch {
    res.status(500).json({ success: false, error: "Failed to fetch cart" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, currentPassword, newPassword } = req.body;
    const user = await Users.findOne({ id: req.user.id });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    // Only these fields can be changed; everything else in the body is ignored.
    const fields = {};

    if (name !== undefined && name !== "") {
      if (!isNonEmptyString(name, 80)) return res.status(400).json({ success: false, error: "Please enter a valid name" });
      fields.name = name.trim();
    }
    if (phone !== undefined && phone !== "") {
      if (!isNonEmptyString(phone, 30)) return res.status(400).json({ success: false, error: "Please enter a valid phone number" });
      fields.phone = phone.trim();
    }
    if (email !== undefined && email !== "") {
      if (!isEmail(email)) return res.status(400).json({ success: false, error: "Please enter a valid email address" });
      const normalizedEmail = email.trim().toLowerCase();
      if (normalizedEmail !== user.email) {
        const taken = await Users.findOne({ email: normalizedEmail, id: { $ne: user.id } });
        if (taken) return res.status(400).json({ success: false, error: "That email address is already in use" });
        fields.email = normalizedEmail;
      }
    }
    if (newPassword !== undefined && newPassword !== "") {
      if (typeof currentPassword !== "string" || !(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(400).json({ success: false, error: "Current password is incorrect" });
      }
      if (!isValidPassword(newPassword)) {
        return res.status(400).json({
          success: false,
          error: `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters`,
        });
      }
      fields.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    }

    const updated = await Users.findOneAndUpdate({ id: user.id }, { $set: fields }, { new: true });
    res.json({ success: true, user: publicUser(updated) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "That email address is already in use" });
    }
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findOne({ id: req.user.id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(publicUser(user));
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
