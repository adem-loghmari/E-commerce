const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.js");
const fetchUser = require("../middleware/auth.js");

// User routes — require JWT auth
router.post("/orders", fetchUser, orderController.createOrder);
router.post("/orderslog", fetchUser, orderController.getMyOrders);

// Admin routes — no user auth required
router.get("/allorders", orderController.getAllOrders);
router.post("/removeOrder", orderController.removeOrder);
router.post("/modifyOrder", orderController.modifyOrder);
router.post("/updateOrderStatus", orderController.updateOrderStatus);
router.get("/order/:id", orderController.getSingleOrder);

module.exports = router;
