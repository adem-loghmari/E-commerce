import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

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
      fetch("/api/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: "",
      })
        .then((resp) => resp.json())
        .then((data) => setCartItems(data));

      fetch("/api/orderslog", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: "",
      })
        .then((resp) => resp.json())
        .then((data) => setOrders(data));
    }
  }, []);
  const addToCart = (itemId, count = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + count, // Default to 0 if undefined
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("/api/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1), // Ensure it doesn't go negative
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("/api/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
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
