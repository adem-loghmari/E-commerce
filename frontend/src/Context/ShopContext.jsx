import React, { createContext, useCallback, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const clearSession = () => {
  localStorage.removeItem("auth-token");
  localStorage.removeItem("user-name");
};

// POST with the user's token. An expired or invalid token ends the session and sends the user to login.
const authPost = async (url, body = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
    body: JSON.stringify(body),
  });
  if (response.status === 401) {
    clearSession();
    window.location.replace("/login");
    throw new Error("Session expired");
  }
  return response;
};

const ShopContextProvider = (props) => {
  const [all_products, setAll_Products] = useState([]);
  // { [productId]: quantity }
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);

  const refreshOrders = useCallback(() => {
    if (!localStorage.getItem("auth-token")) return Promise.resolve();
    return authPost("/api/orderslog")
      .then((r) => r.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);
  // Loads the logged-in user's cart and orders (on app start and after login).
  const loadUserData = useCallback(() => {
    if (!localStorage.getItem("auth-token")) return;
    authPost("/api/getcart")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => setCartItems(data && typeof data === "object" ? data : {}))
      .catch(() => {});
    refreshOrders();
  }, [refreshOrders]);

  useEffect(() => {
    fetch("/api/allproducts")
      .then((resp) => resp.json())
      .then((data) => setAll_Products(Array.isArray(data) ? data : []))
      .catch(() => setAll_Products([]));
    loadUserData();
  }, [loadUserData]);

  const syncCart = (url, body) => {
    if (localStorage.getItem("auth-token")) authPost(url, body).catch(() => {});
  };
  const addToCart = (itemId, count = 1) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + count }));
    syncCart("/api/addtocart", { itemId, count });
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1) }));
    syncCart("/api/removefromcart", { itemId });
  };
  // Removes a product from the cart entirely, whatever its quantity.
  const removeLineFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    syncCart("/api/removefromcart", { itemId, removeAll: true });
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_products.find((e) => e.id === Number(item));
        if (itemInfo) totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
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
    setCartItems({});
  };
  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    removeLineFromCart,
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
