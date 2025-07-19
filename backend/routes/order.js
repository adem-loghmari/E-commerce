const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.js");
const fetchUser = require("../middleware/auth.js");

router.post("/orders", fetchUser, orderController.createOrder);

module.exports = router;