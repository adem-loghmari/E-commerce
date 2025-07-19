const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.js");
const fetchUser = require("../middleware/auth.js");

router.post("/orders", fetchUser, orderController.createOrder);
router.get("/allorders", orderController.getAllOrders);
router.post("/removeOrder", orderController.removeOrder);
router.post("/modifyOrder", orderController.modifyOrder);
router.get("/order/:id", orderController.getSingleOrder);   
module.exports = router;