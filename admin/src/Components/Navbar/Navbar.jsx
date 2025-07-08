import React from "react";
import navlogo from "../../assets/nav-logo.svg";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    window.location.href = "/login";
  };

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 shadow-2xl fixed top-0 left-0 z-50 font-sans">
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start min-w-0">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border-2 border-pink-400 shadow min-w-0">
            <img src={navlogo} alt="logo" className="h-7 w-7 object-contain" />
          </div>
          <span className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold tracking-widest text-white drop-shadow truncate max-w-[50vw]">
            ADMIN PANEL
          </span>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0">
          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 rounded-xl bg-red-700/80 hover:bg-pink-600 text-white font-bold text-sm sm:text-base shadow transition flex items-center gap-2"
            type="button"
          >
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
