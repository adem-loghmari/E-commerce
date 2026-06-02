const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const Users = require("../models/UsersModel");

const createOrder = async (req, res) => {
  try {
    const { cartSnapshot, total, shippingAddress, paymentMethod } = req.body;

    const lastOrder = await Order.findOne().sort({ id: -1 });
    const id = lastOrder ? lastOrder.id + 1 : 1;

    const userData = await Users.findOne({ id: req.user.id });
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newOrder = new Order({
      id,
      user: userData._id,
      user_name: userData.name,
      user_phone: userData.phone,
      user_id: userData.id,
      cartSnapshot,
      total,
      shippingAddress,
      paymentMethod,
      status: "pending",
    });

    const savedOrder = await newOrder.save();

    // Reset user's cart
    const numProducts = await Product.countDocuments();
    await Users.findOneAndUpdate(
      { id: req.user.id },
      {
        $set: {
          cartData: Object.fromEntries(
            Array.from({ length: numProducts }, (_, i) => [i + 1, 0])
          ),
        },
      }
    );

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ id: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const removeOrder = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order id is required" });
    }
    const deleted = await Order.findOneAndDelete({ id: Number(id) });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order removed successfully", id });
  } catch (error) {
    console.error("Error removing order:", error);
    res.status(500).json({ success: false, message: "Failed to remove order" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled", "completed"];
    if (!id) {
      return res.status(400).json({ success: false, message: "Order id is required" });
    }
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
    }
    const updated = await Order.findOneAndUpdate(
      { id: Number(id) },
      { $set: { status } },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order: updated });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

const modifyOrder = async (req, res) => {
  try {
    const { id, user_name, shippingAddress, status, paymentMethod, cartSnapshot, total } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order id is required" });
    }

    const order = await Order.findOne({ id: Number(id) });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const updateFields = {};
    if (user_name !== undefined) updateFields.user_name = user_name;
    if (shippingAddress) updateFields.shippingAddress = shippingAddress;
    if (status) updateFields.status = status;
    if (paymentMethod) updateFields.paymentMethod = paymentMethod;
    if (cartSnapshot) updateFields.cartSnapshot = cartSnapshot;
    if (total !== undefined) updateFields.total = total;

    const updated = await Order.findOneAndUpdate(
      { id: Number(id) },
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Order updated successfully", order: updated });
  } catch (error) {
    console.error("Error modifying order:", error);
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: "Invalid order id" });
    const order = await Order.findOne({ id });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    if (!orders || orders.length === 0) {
      return res.status(200).json([]);
    }

    const formattedOrders = orders.map((order) => {
      let items = [];
      if (order.cartSnapshot instanceof Map) {
        items = Array.from(order.cartSnapshot.entries()).map(([productId, quantity]) => ({ productId, quantity }));
      } else if (order.cartSnapshot && typeof order.cartSnapshot === "object") {
        items = Object.entries(order.cartSnapshot).map(([productId, quantity]) => ({ productId, quantity }));
      }

      return {
        id: order._id,
        orderNumber: order.id || order._id.toString(),
        status: order.status,
        createdAt: order.createdAt,
        items,
        shippingAddress: {
          street: order.shippingAddress?.street || "",
          city: order.shippingAddress?.city || "",
          zipCode: order.shippingAddress?.zipCode || "",
          country: order.shippingAddress?.country || "",
        },
        paymentMethod: order.paymentMethod,
        total: order.total,
        user: {
          name: order.user_name || "",
          id: order.user_id || "",
        },
      };
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders", error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  removeOrder,
  updateOrderStatus,
  modifyOrder,
  getSingleOrder,
  getMyOrders,
};
