import React, { createContext, useCallback, useEffect, useState } from "react";
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

  const refreshOrders = useCallback(() => {
    if (!localStorage.getItem("auth-token")) return Promise.resolve();
    return authPost("/api/orderslog")
      .then((r) => r.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  }, []);
  // Loads the logged-in user's cart and orders (on app start and after login).
  const loadUserData = useCallback(() => {
    if (!localStorage.getItem("auth-token")) return;
    authPost("/api/getcart").then((r) => r.json()).then(setCartItems);
    refreshOrders();
  }, [refreshOrders]);

  useEffect(() => {
    fetch("/api/allproducts")
      .then((resp) => resp.json())
      .then((data) => setAll_Products(data));
    loadUserData();
  }, [loadUserData]);
  const addToCart = (itemId, count = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + count, // Default to 0 if undefined
    }));
    if (localStorage.getItem("auth-token")) {
      authPost("/api/addtocart", { itemId, count });
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
    refreshOrders,
    loadUserData,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
