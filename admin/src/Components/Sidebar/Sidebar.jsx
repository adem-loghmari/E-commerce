import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 shadow-lg md:hidden focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
      >
        <span className="sr-only">Toggle Sidebar</span>
        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 z-40 w-64 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-800 shadow-xl flex flex-col px-4 gap-6
          transition-transform duration-300
          pt-16 md:pt-8
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:fixed md:block
        `}
        style={{
          top: "4.5rem",
          height: "calc(100vh - 4.5rem)",
        }}
      >
        <nav className="flex flex-col gap-4">
          <Link to="/" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <svg
                className="h-7 w-7 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0a2 2 0 01-2-2V7m6 11a2 2 0 002-2v-6m0 0l2 2m-2-2v6"
                />
              </svg>
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">
                Dashboard
              </p>
            </div>
          </Link>
          <Link to="/orders" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <svg
                className="h-7 w-7 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">
                List Orders
              </p>
            </div>
          </Link>
          <Link to="/orders" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <svg
                className="h-7 w-7 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L12 14l-4 1 1-4 7.5-7.5z"
                />
              </svg>

              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">
                Modify Order
              </p>
            </div>
          </Link>
          <Link to="/listproduct" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <svg
                className="h-7 w-7 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">
                List Product
              </p>
            </div>
          </Link>
          <Link to="/addproduct" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <svg
                className="h-7 w-7 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">
                Add Product
              </p>
            </div>
          </Link>
          <Link to="/modifyproduct" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <svg
                className="h-7 w-7 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-4.243 1.415 1.415-4.243a4 4 0 01.94-1.414z"
                />
              </svg>
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">
                Modify Product
              </p>
            </div>
          </Link>
          <Link to="/users" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <svg
                className="h-7 w-7 text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">
                Users
              </p>
            </div>
          </Link>
        </nav>
      </aside>
      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
