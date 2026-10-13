const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/auth.js");
const adminAuth = require("../middleware/adminAuth.js");
const userController = require("../controllers/user");
const { authLimiter } = require("../middleware/rateLimit");

router.get("/allusers", adminAuth, userController.getAllUsers);
router.post("/signup", authLimiter, userController.signupUser);
router.post("/login", authLimiter, userController.loginUser);
router.post("/removeuser", adminAuth, userController.removeUser);
router.post("/addtocart", fetchUser, userController.addToCart);
router.post("/removefromcart", fetchUser, userController.removefromcart);
router.post("/getcart", fetchUser, userController.getCart);
router.post("/updateProfile", fetchUser, userController.updateProfile);
router.get("/getuser", fetchUser, userController.getUser);

module.exports = router;
