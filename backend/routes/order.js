const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.js");
const fetchUser = require("../middleware/auth.js");
const adminAuth = require("../middleware/adminAuth.js");

// User routes — require JWT auth
router.post("/orders", fetchUser, orderController.createOrder);
router.post("/orderslog", fetchUser, orderController.getMyOrders);

// Admin routes
router.get("/allorders", adminAuth, orderController.getAllOrders);
router.post("/removeOrder", adminAuth, orderController.removeOrder);
router.post("/modifyOrder", adminAuth, orderController.modifyOrder);
router.post("/updateOrderStatus", adminAuth, orderController.updateOrderStatus);
router.get("/order/:id", adminAuth, orderController.getSingleOrder);

module.exports = router;
