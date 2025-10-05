import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let num_products = 0; // Initialize num_products
  fetch("/api/getTotalProducts")
    .then((resp) => {
      if (!resp.ok) throw new Error("Request failed");
      return resp.json();
    })
    .then((data) => {
      num_products = data.total; // Fix: Access .total property
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      num_products = 300; // Fallback
    });
  let cartItems = {};
  for (let i = 0; i < num_products + 1; i++) {
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
  const addToCart = (itemId , count = 1) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + count }));
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
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
