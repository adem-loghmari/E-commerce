import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const authPost = (url, body = {}) =>
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
    body: JSON.stringify(body),
  });

const getDefaultCart = () => {
  let cartItems = {};
  // Initialize with enough slots for products (safely initialize all)
  for (let i = 0; i < 300; i++) {
    cartItems[i] = 0;
  }
  return cartItems;
};
const ShopContextProvider = (props) => {
  const [all_products, setAll_Products] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/allproducts")
      .then((resp) => resp.json())
      .then((data) => setAll_Products(data));
    if (localStorage.getItem("auth-token")) {
      authPost("/api/getcart").then((r) => r.json()).then(setCartItems);
      authPost("/api/orderslog").then((r) => r.json()).then(setOrders);
    }
  }, []);
  const addToCart = (itemId, count = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + count, // Default to 0 if undefined
    }));
    if (localStorage.getItem("auth-token")) {
      authPost("/api/addtocart", { itemId });
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1), // Ensure it doesn't go negative
    }));
    if (localStorage.getItem("auth-token")) {
      authPost("/api/removefromcart", { itemId });
    }
  };
  const getTotalCartAmount = () => {
    let totalAmout = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find((e) => e.id === Number(item));
        totalAmout += itemInfo?.new_price * cartItems[item];
      }
    }
    return totalAmout;
  };
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };
  const resetCart = () => {
    setCartItems(getDefaultCart());
  };
  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    resetCart,
    orders,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
