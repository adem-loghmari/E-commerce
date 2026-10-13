const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authLimiter } = require("../middleware/rateLimit");

router.post("/admin/login", authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ success: false, errors: "Username and password are required" });
    }

    // Always run the hash comparison so the response time does not reveal a valid username.
    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (username !== process.env.ADMIN_USERNAME || !match) {
      return res.status(401).json({ success: false, errors: "Invalid credentials" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ success: true, token });
  } catch {
    res.status(500).json({ success: false, errors: "Login failed. Please try again." });
  }
});

module.exports = router;
