import React, { useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import SearchBar from "../Search/SearchBar";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const initialMenu =
    path === "/"
      ? "shop"
      : path === "/mens"
      ? "mens"
      : path === "/womens"
      ? "womens"
      : path === "/kids"
      ? "kids"
      : path === "/login"
      ? "login"
      : path === "/cart"
      ? "cart"
      : "shop";
  const [menu, setMenu] = useState(initialMenu);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 shadow-2xl fixed top-0 left-0 z-50 font-sans">
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4 relative">
        <Link
          onClick={() => setMenu("shop")}
          className="flex items-center gap-3 text-white hover:text-pink-400 transition-colors duration-200"
          to="/"
        >
          <img
            src={logo}
            alt="logo"
            className="h-12 w-12 object-contain rounded-full shadow-lg border-2 border-pink-400"
          />
          <span className="text-3xl font-extrabold tracking-widest drop-shadow-lg">
            SHOPPER
          </span>
        </Link>

        <div className="flex items-center md:hidden z-50">
          <button
            onClick={dropdown_toggle}
            className="inline-flex items-center justify-center p-3 rounded-full text-pink-400 bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition relative z-50"
            aria-label="Open menu"
            type="button"
          >
            {/* Animated Hamburger/Close Icon - Tailwind only, always centered */}
            <span className="relative w-8 h-8 flex items-center justify-center">
              <span
                className={`absolute w-6 h-1 bg-pink-400 rounded transition-all duration-300 ${
                  mobileOpen ? "rotate-45 top-4" : "top-2"
                }`}
              ></span>
              <span
                className={`absolute w-6 h-1 bg-pink-400 rounded transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : "top-4"
                }`}
              ></span>
              <span
                className={`absolute w-6 h-1 bg-pink-400 rounded transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 top-4" : "top-6"
                }`}
              ></span>
            </span>
          </button>
        </div>
        {/* Desktop Menu */}
        <ul
          ref={menuRef}
          className={`hidden md:flex gap-6 items-center text-lg font-semibold nav-menu`}
        >
          <li>
            <SearchBar />
          </li>
          <li>
            <Link
              className={`px-5 py-2 rounded-full hover:bg-pink-400/20 hover:text-pink-400 transition backdrop-blur-md ${
                menu === "shop"
                  ? "bg-pink-400/30 text-pink-400 shadow-lg"
                  : "text-white/90"
              }`}
              to="/"
              onClick={() => setMenu("shop")}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              className={`px-5 py-2 rounded-full hover:bg-pink-400/20 hover:text-pink-400 transition backdrop-blur-md ${
                menu === "mens"
                  ? "bg-pink-400/30 text-pink-400 shadow-lg"
                  : "text-white/90"
              }`}
              to="/mens"
              onClick={() => setMenu("mens")}
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              className={`px-5 py-2 rounded-full hover:bg-pink-400/20 hover:text-pink-400 transition backdrop-blur-md ${
                menu === "womens"
                  ? "bg-pink-400/30 text-pink-400 shadow-lg"
                  : "text-white/90"
              }`}
              to="/womens"
              onClick={() => setMenu("womens")}
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              className={`px-5 py-2 rounded-full hover:bg-pink-400/20 hover:text-pink-400 transition backdrop-blur-md ${
                menu === "kids"
                  ? "bg-pink-400/30 text-pink-400 shadow-lg"
                  : "text-white/90"
              }`}
              to="/kids"
              onClick={() => setMenu("kids")}
            >
              Kids
            </Link>
          </li>
        </ul>
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6 nav-login-cart">
          {localStorage.getItem("auth-token") ? (
            <>
              <span className="text-white font-bold text-lg px-2">
                {localStorage.getItem("user-name") || "User"}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("user-name");
                  window.location.replace("/");
                }}
                className="px-7 py-2 rounded-full bg-white/30 border border-pink-400 text-pink-600 font-medium text-lg shadow-md backdrop-blur-md hover:bg-pink-100/60 hover:text-pink-700 hover:border-pink-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
                style={{
                  background: "rgba(255,255,255,0.3)",
                  borderColor: "#f472b6",
                  color: "#db2777",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenu("login")}>
              <button
                className="px-7 py-2 rounded-full bg-white/30 border border-blue-400 text-blue-600 font-medium text-lg shadow-md backdrop-blur-md hover:bg-blue-100/60 hover:text-blue-700 hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{
                  background: "rgba(255,255,255,0.3)",
                  borderColor: "white",
                  color: "white",
                }}
              >
                Login
              </button>
            </Link>
          )}
          <Link
            to="/cart"
            className="relative group"
            onClick={() => setMenu("cart")}
          >
            <div className="bg-white/30 backdrop-blur-md rounded-full p-3 shadow-xl hover:scale-110 transition-transform">
              <img src={cart_icon} alt="cart icon" className="h-8 w-8" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow group-hover:scale-110 transition-transform">
                {getTotalCartItems()}
              </span>
            </div>
          </Link>
        </div>
        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        ></div>
        {/* Mobile Menu - Full Page Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-full md:hidden z-50 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative h-full w-full bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 flex flex-col">
            {/* Close Icon */}
            <button
              onClick={dropdown_toggle}
              className="absolute top-6 right-6 z-50 p-2 rounded-full text-pink-400 bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              aria-label="Close menu"
              type="button"
            >
              <span className="block w-8 h-8 relative">
                <span className="absolute w-8 h-1 bg-pink-400 rounded rotate-45 top-4 left-0 transition-all duration-300"></span>
                <span className="absolute w-8 h-1 bg-pink-400 rounded -rotate-45 top-4 left-0 transition-all duration-300"></span>
              </span>
            </button>
            <nav className="flex flex-col h-full pt-24 pb-10 px-8 gap-2">
              <ul className="flex flex-col gap-2 w-full text-lg font-bold">
                <li>
                  <Link
                    className={`block px-4 py-4 rounded-lg transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40 ${
                      menu === "shop"
                        ? "bg-pink-500/20 text-pink-300 shadow"
                        : "text-white"
                    }`}
                    to="/"
                    onClick={() => {
                      setMenu("shop");
                      setMobileOpen(false);
                    }}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-4 py-4 rounded-lg transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40 ${
                      menu === "mens"
                        ? "bg-pink-500/20 text-pink-300 shadow"
                        : "text-white"
                    }`}
                    to="/mens"
                    onClick={() => {
                      setMenu("mens");
                      setMobileOpen(false);
                    }}
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-4 py-4 rounded-lg transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40 ${
                      menu === "womens"
                        ? "bg-pink-500/20 text-pink-300 shadow"
                        : "text-white"
                    }`}
                    to="/womens"
                    onClick={() => {
                      setMenu("womens");
                      setMobileOpen(false);
                    }}
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-4 py-4 rounded-lg transition-all duration-200 hover:bg-pink-500/10 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40 ${
                      menu === "kids"
                        ? "bg-pink-500/20 text-pink-300 shadow"
                        : "text-white"
                    }`}
                    to="/kids"
                    onClick={() => {
                      setMenu("kids");
                      setMobileOpen(false);
                    }}
                  >
                    Kids
                  </Link>
                </li>
                <li>
                  <SearchBar />
                </li>
              </ul>
              <div className="flex flex-col gap-2 w-full mt-8">
                {localStorage.getItem("auth-token") ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("auth-token");
                      localStorage.removeItem("user-name");
                      window.location.replace("/");
                      setMobileOpen(false);
                    }}
                    className="block w-full px-4 py-4 rounded-lg bg-pink-600 text-white font-bold text-lg shadow hover:bg-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="block w-full">
                    <button className="block w-full px-4 py-4 rounded-lg bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200">
                      Login
                    </button>
                  </Link>
                )}
                <Link to="/cart" className="block w-full">
                  <div className="relative bg-gray-800 rounded-lg p-4 shadow border border-pink-700 flex items-center gap-4 hover:bg-pink-900/20 transition">
                    <img src={cart_icon} alt="cart icon" className="h-8 w-8" />
                    <span className="bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                      {getTotalCartItems()}
                    </span>
                    <span className="text-white font-semibold">Cart</span>
                  </div>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
