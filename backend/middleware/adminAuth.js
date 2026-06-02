const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = req.header("admin-token");
  if (!token) {
    return res.status(401).json({ errors: "Admin access required" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (data.role !== "admin") {
      return res.status(403).json({ errors: "Forbidden" });
    }
    next();
  } catch {
    res.status(401).json({ errors: "Invalid or expired token" });
  }
};

module.exports = adminAuth;
