import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const { orders } = useContext(ShopContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/allproducts");
        const data = await response.json();
        setAllProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your order history
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders yet.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filterStatus === "all"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setFilterStatus("processing")}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filterStatus === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Processing
                </button>
                <button
                  onClick={() => setFilterStatus("shipped")}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filterStatus === "shipped"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Shipped
                </button>
                <button
                  onClick={() => setFilterStatus("delivered")}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    filterStatus === "delivered"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Delivered
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {filteredOrders.length}{" "}
                {filteredOrders.length === 1 ? "order" : "orders"} found
              </p>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order._id} className="bg-white shadow overflow-hidden rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Order #{order.orderNumber || order.id}
                        </p>
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-medium text-gray-900">
                          ${order.total.toFixed(2)}
                        </p>
                        <button
                          onClick={() => toggleOrderDetails(order._id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          {expandedOrder === order._id
                            ? "Hide details"
                            : "View details"}
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {order.items?.length || 0}{" "}
                        {order.items?.length === 1 ? "item" : "items"}
                      </div>
                    </div>
                  </div>

                  {expandedOrder === order._id && (
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h3>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Name:</span> {order.user.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Address:</span> {order.shippingAddress?.street}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">City:</span> {order.shippingAddress?.city}, {order.shippingAddress?.zipCode}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h3>
                          <div className="flex items-center">
                            <div className={`p-2 rounded-md ${
                              order.paymentMethod === "paypal"
                                ? "bg-blue-50"
                                : "bg-gray-50"
                            }`}>
                              {order.paymentMethod === "paypal" ? (
                                <svg
                                  className="h-6 w-6 text-blue-500"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M7.5 14.25c0-1.03.62-1.91 1.5-2.28V4.25c0-.69.56-1.25 1.25-1.25h5.5c.69 0 1.25.56 1.25 1.25v7.72c.88.37 1.5 1.25 1.5 2.28V18H7.5v-3.75z" />
                                  <path d="M18 9.75c0-.69-.56-1.25-1.25-1.25h-1.5v1.25h1.5v1.5h-1.5v1.5h1.5v1.5h-1.5v1.5h1.5c.69 0 1.25-.56 1.25-1.25v-4.5z" />
                                </svg>
                              ) : (
                                <svg
                                  className="h-6 w-6 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {order.paymentMethod === "paypal"
                                  ? "PayPal"
                                  : "Credit/Debit Card"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {order.paymentMethod === "paypal"
                                  ? order.paymentResult?.email || ""
                                  : `Card ending in ${order.paymentInfo?.last4 || "••••"}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Order Items</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {order.items?.map((item) => {
                                const product = allProducts[item.productId];
                                return (
                                  <tr key={`${item.productId}-${order._id}`}>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                          <img
                                            className="h-10 w-10 rounded object-cover"
                                            src={product.image || "/placeholder-product.png"}
                                            alt={product.name || "Product"}
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">
                                            {product.name || "Unknown Product"}
                                          </div>
                                          <div className="text-sm text-gray-500">
                                            {product.category || ""}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                      ${product.new_price ? product.new_price.toFixed(2) : "0.00"}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {item.quantity}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                      ${(product.price * item.quantity).toFixed(2)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {order.status === "delivered" && (
                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Leave a Review
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;