import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ModifyOrder = () => {
  const { id: routeId } = useParams();
  const [orderId, setOrderId] = useState(routeId || "");
  const [order, setOrder] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [newProductId, setNewProductId] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("/api/allproducts");
        const data = await response.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAllProducts();

    if (routeId) {
      handleFetch(routeId);
    }
  }, [routeId]);

  const handleFetch = async (fetchId) => {
    setLoading(true);
    setError("");
    setSuccess("");
    setOrder(null);
    try {
      const resp = await fetch(`/api/order/${fetchId || orderId}`);
      if (!resp.ok) throw new Error("Order not found");
      const data = await resp.json();
      // Initialize cartSnapshot as array of objects for easier manipulation
      const cartItems = Object.entries(data.cartSnapshot).map(([id, quantity]) => ({
        id: parseInt(id),
        quantity
      }));
      setOrder({ ...data, cartItems });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("shippingAddress")) {
      const field = name.split(".")[1];
      setOrder({
        ...order,
        shippingAddress: {
          ...order.shippingAddress,
          [field]: value
        }
      });
    } else {
      setOrder({ ...order, [name]: value });
    }
  };

  const handleProductChange = (index, field, value) => {
    const updatedCartItems = [...order.cartItems];
    updatedCartItems[index] = {
      ...updatedCartItems[index],
      [field]: field === "id" ? parseInt(value) : parseInt(value)
    };
    setOrder({
      ...order,
      cartItems: updatedCartItems,
      total: calculateTotal(updatedCartItems)
    });
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      const product = allProducts.find(p => p.id === item.id);
      return total + (product?.new_price || 0) * item.quantity;
    }, 0);
  };

  const addProduct = (productId) => {
    if (!productId) return;
    const existingItemIndex = order.cartItems.findIndex(item => item.id === parseInt(productId));
    
    if (existingItemIndex >= 0) {
      // Increase quantity if product already exists
      const updatedItems = [...order.cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setOrder({
        ...order,
        cartItems: updatedItems,
        total: calculateTotal(updatedItems)
      });
    } else {
      // Add new product
      const newItem = { id: parseInt(productId), quantity: 1 };
      setOrder({
        ...order,
        cartItems: [...order.cartItems, newItem],
        total: calculateTotal([...order.cartItems, newItem])
      });
    }
    setNewProductId("");
    setShowProductSelector(false);
  };

  const removeProduct = (index) => {
    const updatedItems = order.cartItems.filter((_, i) => i !== index);
    setOrder({
      ...order,
      cartItems: updatedItems,
      total: calculateTotal(updatedItems)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Convert cartItems back to cartSnapshot format
      const cartSnapshot = order.cartItems.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});

      const orderToUpdate = {
        ...order,
        cartSnapshot
      };

      const response = await fetch("/api/modifyOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderToUpdate),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess("Order updated successfully");
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const getProductDetails = (productId) => {
    return allProducts.find(p => p.id === productId) || {};
  };

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center justify-center pt-24 overflow-auto">
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-6 border border-blue-700 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-wide text-center">
          Modify Order
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
          />
          <button
            onClick={() => {
              if (orderId && orderId !== routeId) {
                window.location.href = `/modifyorder/${orderId}`;
              } else {
                handleFetch();
              }
            }}
            disabled={!orderId || loading}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:opacity-50"
          >
            Fetch
          </button>
        </div>

        {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-400 mb-4 text-center">{success}</div>}
        {loading && <div className="text-blue-300 mb-4 text-center">Loading...</div>}

        {order && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Order Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">Order Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-blue-200 mb-1">Order ID</label>
                    <input
                      value={order.id}
                      readOnly
                      className="w-full px-3 py-2 rounded bg-gray-700 text-gray-300 border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-1">Customer</label>
                    <input
                      name="user_name"
                      value={order.user_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-1">Order Date</label>
                    <input
                      value={new Date(order.createdAt).toLocaleString()}
                      readOnly
                      className="w-full px-3 py-2 rounded bg-gray-700 text-gray-300 border border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information Section */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">Shipping Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-blue-200 mb-1">Address</label>
                    <input
                      name="shippingAddress.street"
                      value={order.shippingAddress.street}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-blue-200 mb-1">City</label>
                      <input
                        name="shippingAddress.city"
                        value={order.shippingAddress.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-200 mb-1">ZIP</label>
                      <input
                        name="shippingAddress.zipCode"
                        value={order.shippingAddress.zipCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status Section */}
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">Order Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-200 mb-1">Status</label>
                  <select
                    value={order.status}
                    onChange={handleChange}
                    name="status"
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-blue-200 mb-1">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={order.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Order Items Section */}
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-blue-300">Order Items</h3>
                <button
                  type="button"
                  onClick={() => setShowProductSelector(!showProductSelector)}
                  className="px-3 py-1 bg-green-700 hover:bg-green-600 rounded text-sm text-white"
                >
                  {showProductSelector ? "Cancel" : "Add Product"}
                </button>
              </div>

              {showProductSelector && (
                <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                  <div className="flex gap-2">
                    <select
                      value={newProductId}
                      onChange={(e) => setNewProductId(e.target.value)}
                      className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-blue-700"
                    >
                      <option value="">Select a product</option>
                      {allProducts.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} (${product.new_price})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => addProduct(newProductId)}
                      disabled={!newProductId}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {order.cartItems.map((item, index) => {
                  const product = getProductDetails(item.id);
                  return (
                    <div key={`${item.id}-${index}`} className="grid grid-cols-12 gap-2 items-center p-2 bg-gray-700/50 rounded">
                      <div className="col-span-1">
                        <img
                          src={product.image || ""}
                          alt="Product"
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      <div className="col-span-4">
                        <select
                          value={item.id}
                          onChange={(e) => handleProductChange(index, "id", e.target.value)}
                          className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-blue-700 text-sm"
                        >
                          {allProducts.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                          className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-blue-700"
                        />
                      </div>
                      <div className="col-span-2 text-right text-yellow-300">
                        ${product.new_price ? (product.new_price * item.quantity).toFixed(2) : "0.00"}
                      </div>
                      <div className="col-span-2 text-right">
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-white text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowProductSelector(!showProductSelector)}
                  className="px-3 py-1 bg-green-700 hover:bg-green-600 rounded text-sm text-white"
                >
                  {showProductSelector ? "Cancel" : "Add Product"}
                </button>
                <div className="text-xl font-semibold text-green-300">
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModifyOrder;