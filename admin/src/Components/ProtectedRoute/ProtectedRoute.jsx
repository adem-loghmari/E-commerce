import React from "react";
import { Navigate } from "react-router-dom";

// Reads the expiry from the token so an expired session goes straight to the login page.
// This is only a convenience: the API verifies the token on every admin request.
const isTokenActive = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admin-token");
  if (token && isTokenActive(token)) return children;
  localStorage.removeItem("admin-token");
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
