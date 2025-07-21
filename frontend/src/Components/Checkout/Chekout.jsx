import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { countries } from "../Assets/countries";
const Checkout = () => {
  const {
    cartItems,
    getTotalCartAmount,
    getTotalCartItems,
    all_products,
    resetCart,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get cart products with quantity > 0
  const cartProducts = all_products.filter(
    (product) => cartItems[product.id] > 0
  );

  // Create cart snapshot (productId: quantity)
  const cartSnapshot = {};
  cartProducts.forEach((product) => {
    cartSnapshot[product.id] = cartItems[product.id];
  });

  const handlePlaceOrder = async () => {
    // Validate form
    if (
      !shippingInfo.street ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zipCode
    ) {
      setError("Please fill in all required shipping fields");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const orderData = {
        cartSnapshot,
        total: getTotalCartAmount(),
        shippingAddress: shippingInfo,
        paymentMethod,
      };

      const response = await fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      const successCartProducts = [...cartProducts]; // Clone array
      const successCartItems = { ...cartItems }; // Clone object

      resetCart();

      setOrderDetails({
        ...data.order,
        displayProducts: successCartProducts,
        displayItems: successCartItems,
      });
      setOrderSuccess(true);
    } catch (err) {
      console.error("Order error:", err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess && orderDetails) {
    return (
      <div className="w-full min-h-screen py-16 bg-gray-100 flex flex-col items-center mt-24">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-4">
            Order Placed Successfully!
          </h1>
          <p className="mb-6">Order ID: #{orderDetails.id}</p>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {orderDetails.displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 object-contain mr-3"
                    />
                    <span>
                      {product.name} × {orderDetails.displayItems[product.id]}
                    </span>
                  </div>
                  <span>
                    $
                    {(
                      product.new_price * orderDetails.displayItems[product.id]
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total:</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/orders">
            <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View Your Orders
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-16 bg-gray-100 flex flex-col items-center mt-24">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Street Address*</label>
                <input
                  type="text"
                  name="street"
                  value={shippingInfo.street}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">State*</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">ZIP Code*</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Country</label>
                  <select
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    {countries.map(({ country, code }) => (
                      <option key={code} value={code}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Payment Method</h2>
            <div className="space-y-3">
              {["cash", "card", "paypal"].map((method) => (
                <div key={method} className="border p-4 rounded bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={method}
                      name="paymentMethod"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="h-4 w-4"
                    />
                    <label htmlFor={method}>
                      {method === "cash"
                        ? "Cash on Delivery"
                        : method === "card"
                        ? "Credit/Debit Card"
                        : "PayPal"}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            <div className="border rounded divide-y">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-contain border rounded"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        Qty: {cartItems[product.id]}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    ${(product.new_price * cartItems[product.id]).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${getTotalCartAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${getTotalCartAmount().toFixed(2)}</span>
              </div>
            </div>

            {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || getTotalCartItems() === 0}
              className={`w-full mt-6 py-3 rounded-lg font-bold text-white ${
                isProcessing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
