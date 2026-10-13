const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const Users = require("../models/UsersModel");
const { isNonEmptyString, isPositiveInt } = require("../utils/validate");

const PAYMENT_METHODS = ["cash", "card", "paypal"];
const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled", "completed"];
const MAX_LINE_QUANTITY = 99;

// Validates a { productId: quantity } map against the catalog and prices it from the database,
// so totals never depend on numbers sent by the client.
const priceCart = async (cartSnapshot) => {
  if (!cartSnapshot || typeof cartSnapshot !== "object" || Array.isArray(cartSnapshot)) return null;
  const entries = Object.entries(cartSnapshot).map(([id, qty]) => [Number(id), Number(qty)]);
  if (entries.length === 0 || entries.length > 200) return null;
  if (!entries.every(([id, qty]) => isPositiveInt(id) && isPositiveInt(qty) && qty <= MAX_LINE_QUANTITY)) return null;

  const products = await Product.find({ id: { $in: entries.map(([id]) => id) } }, { id: 1, new_price: 1 }).lean();
  if (products.length !== entries.length) return null;

  const priceById = new Map(products.map((p) => [p.id, p.new_price]));
  const total = entries.reduce((sum, [id, qty]) => sum + priceById.get(id) * qty, 0);
  return { items: Object.fromEntries(entries), total: Math.round(total * 100) / 100 };
};

const cleanAddress = (address) => {
  if (!address || typeof address !== "object") return null;
  const { street, city, state, zipCode, country } = address;
  if (![street, city, state, zipCode].every((v) => isNonEmptyString(v, 120))) return null;
  return {
    street: street.trim(),
    city: city.trim(),
    state: state.trim(),
    zipCode: zipCode.trim(),
    country: isNonEmptyString(country, 60) ? country.trim() : "US",
  };
};

const createOrder = async (req, res) => {
  try {
    const { cartSnapshot, shippingAddress, paymentMethod } = req.body;

    const address = cleanAddress(shippingAddress);
    if (!address) {
      return res.status(400).json({ success: false, message: "Please fill in all required shipping fields" });
    }
    if (!PAYMENT_METHODS.includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: "Please select a valid payment method" });
    }
    const priced = await priceCart(cartSnapshot);
    if (!priced) {
      return res.status(400).json({ success: false, message: "Your cart is empty or contains invalid items" });
    }

    const userData = await Users.findOne({ id: req.user.id });
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const lastOrder = await Order.findOne().sort({ id: -1 });
    const id = lastOrder ? lastOrder.id + 1 : 1;

    const savedOrder = await new Order({
      id,
      user: userData._id,
      user_name: userData.name,
      user_phone: userData.phone,
      user_id: userData.id,
      cartSnapshot: priced.items,
      total: priced.total,
      shippingAddress: address,
      paymentMethod,
      status: "pending",
    }).save();

    await Users.updateOne({ id: req.user.id }, { $set: { cartData: {} } });

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
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
    const validStatuses = ORDER_STATUSES;
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
    const { id, user_name, shippingAddress, status, paymentMethod, cartSnapshot } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Order id is required" });
    }

    const order = await Order.findOne({ id: Number(id) });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const updateFields = {};
    if (user_name !== undefined) {
      if (!isNonEmptyString(user_name, 80)) {
        return res.status(400).json({ success: false, message: "Invalid customer name" });
      }
      updateFields.user_name = user_name.trim();
    }
    if (shippingAddress) {
      // The admin form has no state field, so keep the stored one when it is not sent.
      const address = cleanAddress({ ...order.toObject().shippingAddress, ...shippingAddress });
      if (!address) return res.status(400).json({ success: false, message: "Invalid shipping address" });
      updateFields.shippingAddress = address;
    }
    if (status) {
      if (!ORDER_STATUSES.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
      }
      updateFields.status = status;
    }
    if (paymentMethod) {
      if (!PAYMENT_METHODS.includes(paymentMethod)) {
        return res.status(400).json({ success: false, message: "Invalid payment method" });
      }
      updateFields.paymentMethod = paymentMethod;
    }
    if (cartSnapshot) {
      const priced = await priceCart(cartSnapshot);
      if (!priced) return res.status(400).json({ success: false, message: "Invalid order items" });
      updateFields.cartSnapshot = priced.items;
      updateFields.total = priced.total;
    }

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
