import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 shadow-lg md:hidden focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 z-40 w-64 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-800 shadow-xl flex flex-col px-4 gap-6
          transition-transform duration-300
          pt-16 md:pt-8
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:fixed md:block
        `}
        style={{
          top: '4.5rem',
          height: 'calc(100vh - 4.5rem)',
        }}
      >
        <nav className="flex flex-col gap-4">
          <Link to="/" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <svg className="h-7 w-7 text-blue-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0a2 2 0 01-2-2V7m6 11a2 2 0 002-2v-6m0 0l2 2m-2-2v6" /></svg>
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">Dashboard</p>
            </div>
          </Link>
          <Link to="/addproduct" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <img src={add_product_icon} alt="Add Product" className="h-7 w-7" />
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">Add Product</p>
            </div>
          </Link>
          <Link to="/listproduct" className="no-underline">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-900/40 transition group cursor-pointer">
              <img src={list_product_icon} alt="List Product" className="h-7 w-7" />
              <p className="text-lg font-semibold text-white group-hover:text-blue-300 tracking-wide">List Product</p>
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
  )
}

export default Sidebar