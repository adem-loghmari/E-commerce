const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ errors: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data.user || !Number.isInteger(data.user.id)) {
      return res.status(401).json({ errors: "please authenticate using a valid token" });
    }
    req.user = data.user;
    next();
  } catch {
    res.status(401).json({ errors: "please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
