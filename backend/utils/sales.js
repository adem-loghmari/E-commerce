const Order = require("../models/OrderModel");

// Cancelled orders never count towards sales.
const COUNTED = { status: { $ne: "cancelled" } };

// Units sold per product id, derived from the orders collection.
const soldByProduct = async () => {
  const rows = await Order.aggregate([
    { $match: COUNTED },
    { $project: { items: { $objectToArray: "$cartSnapshot" } } },
    { $unwind: "$items" },
    { $group: { _id: "$items.k", sold: { $sum: "$items.v" } } },
  ]);
  return new Map(rows.map((row) => [Number(row._id), row.sold]));
};

const orderTotals = async () => {
  const [row] = await Order.aggregate([
    { $match: COUNTED },
    { $group: { _id: null, revenue: { $sum: "$total" }, orders: { $sum: 1 } } },
  ]);
  return { revenue: row ? Math.round(row.revenue * 100) / 100 : 0, orders: row ? row.orders : 0 };
};

module.exports = { soldByProduct, orderTotals };
