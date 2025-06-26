import React from 'react'
import navlogo from '../../assets/nav-logo.svg'

const Navbar = () => {
  return (
    <nav className=" w-full bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 shadow-2xl fixed top-0 left-0 z-50 font-sans">
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start min-w-0">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border-2 border-pink-400 shadow min-w-0">
            <img src={navlogo} alt="logo" className="h-7 w-7 object-contain" />
          </div>
          <span className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold tracking-widest text-white drop-shadow truncate max-w-[50vw]">ADMIN PANEL</span>
        </div>
        <span className="text-xs xs:text-sm sm:text-lg md:text-xl font-semibold text-white/80 tracking-wide truncate max-w-[40vw] text-center sm:text-right w-full sm:w-auto mt-2 sm:mt-0">Admin User</span>
      </div>
    </nav>
  )
}

export default Navbar