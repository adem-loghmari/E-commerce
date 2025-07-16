const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/auth.js");
const userController = require("../controllers/user");

router.get("/allusers", userController.getAllUsers);
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.post("/removeuser", userController.removeUser);
router.post("/addtocart", fetchUser, userController.addToCart);
router.post("/removefromcart", fetchUser, userController.removefromcart);
router.post("/getcart",fetchUser, userController.getCart);

module.exports = router;
