const rateLimit = require("express-rate-limit");

// Slows down password guessing on the login and signup endpoints.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, errors: "Too many attempts. Please try again later." },
});

module.exports = { authLimiter };
