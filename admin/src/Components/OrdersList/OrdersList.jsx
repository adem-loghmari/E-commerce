import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [confirmId, setConfirmId] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    await fetch("http://localhost:4000/allorders")
      .then((resp) => resp.json())
      .then((data) => setAllOrders(data.sort((a, b) => b.id - a.id)));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openDeleteModal = (order) => {
    setModalOrder(order);
    setConfirmId("");
    setDeleteError("");
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setModalOrder(null);
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (String(confirmId).trim() !== String(modalOrder.id).trim()) {
      setDeleteError("Order ID must match exactly");
      return;
    }

    await fetch("http://localhost:4000/removeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: modalOrder.id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert(`Order #${modalOrder.id} deleted`);
          closeDeleteModal();
          fetchOrders();
        } else {
          setDeleteError(data.message || "Deletion failed");
        }
      });
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await fetch("http://localhost:4000/updateOrderStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    }).then(() => fetchOrders());
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const filteredOrders =
    statusFilter === "all"
      ? allOrders
      : allOrders.filter((order) => order.status === statusFilter);

  return (
    <div className="lg:ml-50 fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center justify-center pt-24 overflow-auto">
      <div className="w-full max-w-6xl bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-2 sm:p-6 md:p-8 border border-blue-700 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow">
            Order Management
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-blue-200 text-sm sm:text-base">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 border border-blue-700 text-white rounded px-3 py-1 text-sm"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-12 gap-2 bg-gray-900/80 rounded-t-xl px-4 py-3 font-semibold text-blue-200 text-sm sm:text-base">
          <span className="col-span-1 text-center">ID</span>
          <span className="col-span-1">Customer</span>
          <span className="col-span-1 text-center">Date</span>
          <span className="col-span-2">Address</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-1">Method</span>
          <span className="col-span-1 text-left">Total</span>
          <span className="col-span-1 text-center">Items</span>
          <span className="col-span-2 text-center">Actions</span>
        </div>

        <div className="divide-y divide-blue-900 bg-gray-950/80 rounded-b-xl shadow">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center px-4 py-3 hover:bg-blue-950/60 transition text-xs sm:text-sm"
            >
              <span className="col-span-1 text-blue-400 font-mono text-center">
                #{order.id}
              </span>

              <div className="col-span-1">
                <p className="truncate text-white">{order.user_name}</p>
                <p className="truncate text-gray-400 text-xs">
                  {order.user_phone}
                </p>
              </div>

              <span className="col-span-1 text-gray-300">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="col-span-2 text-gray-300">
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </span>

              <div className="col-span-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className={`w-full bg-gray-800 border ${
                    order.status === "pending"
                      ? "border-yellow-500"
                      : order.status === "shipped"
                      ? "border-blue-500"
                      : order.status === "delivered"
                      ? "border-green-500"
                      : "border-gray-700"
                  } rounded px-2 py-1 text-white text-xs sm:text-sm`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <span className="col-span-1 text-left text-green-300 font-semibold">
                {order.paymentMethod}
              </span>
              <span className="col-span-1 text-left text-green-300 font-semibold">
                ${order.total.toFixed(2)}
              </span>

              <span className="col-span-1 text-center text-yellow-300">
                {Object.keys(order.cartSnapshot || {}).length}
              </span>

              <div className="col-span-2 flex justify-center gap-2">
                <Link
                  to={`/modifyorder/${order.id}`}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-700/20 hover:bg-blue-700/40 transition group"
                  title="View/Edit Order"
                >
                  <svg
                    className="h-5 w-5 text-blue-300 group-hover:text-blue-100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Link>
                <button
                  onClick={() => openDeleteModal(order)}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-red-700/20 hover:bg-red-700/40 transition group"
                  title="Delete Order"
                >
                  <svg
                    className="h-5 w-5 text-red-300 group-hover:text-red-100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details/Edit Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-900 border-2 border-blue-600 rounded-2xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-300">
                  Order #{selectedOrder.id} Details
                </h2>
                <button
                  onClick={closeOrderDetails}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Customer Information
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-white">
                      <span className="text-blue-300">Name:</span>{" "}
                      {selectedOrder.user_name}
                    </p>
                    <p className="text-white">
                      <span className="text-blue-300">ID:</span>{" "}
                      {selectedOrder.user_id}
                    </p>
                    <p className="text-white mt-2">
                      <span className="text-blue-300">Shipping Address:</span>
                    </p>
                    <p className="text-white">
                      {selectedOrder.shippingAddress.street}
                    </p>
                    <p className="text-white">
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.state}{" "}
                      {selectedOrder.shippingAddress.zipCode}
                    </p>
                    <p className="text-white">
                      {selectedOrder.shippingAddress.country}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Order Summary
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-white">
                      <span className="text-blue-300">Date:</span>{" "}
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                    <p className="text-white">
                      <span className="text-blue-300">Status:</span>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => {
                          updateOrderStatus(selectedOrder.id, e.target.value);
                          setSelectedOrder({
                            ...selectedOrder,
                            status: e.target.value,
                          });
                        }}
                        className="ml-2 bg-gray-700 border border-blue-500 rounded px-2 py-1 text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </p>
                    <p className="text-white">
                      <span className="text-blue-300">Payment Method:</span>{" "}
                      {selectedOrder.paymentMethod}
                    </p>
                    <p className="text-white">
                      <span className="text-blue-300">Total:</span> $
                      {selectedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Order Items
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="divide-y divide-gray-700">
                      {Object.entries(selectedOrder.cartSnapshot || {}).map(
                        ([productId, quantity]) => {
                          const product =
                            all_products.find((p) => p.id == productId) || {};
                          return (
                            <div
                              key={productId}
                              className="py-2 flex justify-between items-center"
                            >
                              <div className="flex items-center">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-10 w-10 object-cover rounded mr-3"
                                />
                                <div>
                                  <p className="text-white">
                                    {product.name || `Product ID: ${productId}`}
                                  </p>
                                  <p className="text-gray-400 text-sm">
                                    Price: $
                                    {product.new_price?.toFixed(2) || "N/A"}
                                  </p>
                                </div>
                              </div>
                              <p className="text-white">× {quantity}</p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeOrderDetails}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Add your save logic here
                    closeOrderDetails();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showModal && modalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-900 border-4 border-red-700 rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-red-400 mb-4 text-center">
                Delete Order #{modalOrder.id}?
              </h2>
              <p className="text-blue-200 mb-2 text-center">
                This will permanently delete this order. To confirm, type the
                order ID below:
              </p>
              <div className="w-full mb-4">
                <input
                  type="text"
                  placeholder={`Order ID (${modalOrder.id})`}
                  value={confirmId}
                  onChange={(e) => setConfirmId(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
              </div>
              {deleteError && (
                <div className="text-red-400 mb-2 text-center">
                  {deleteError}
                </div>
              )}
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow-lg transition text-lg tracking-wide border border-red-900"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg shadow-lg transition text-lg tracking-wide border border-blue-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
