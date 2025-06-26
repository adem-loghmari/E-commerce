import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from "../Assets/instagram_icon.png"
import pinterest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 pt-12 pb-6 px-4 flex flex-col items-center relative z-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={footer_logo} alt="footer logo" className="h-16 w-16 object-contain rounded-full shadow-lg border-2 border-pink-400 mb-2" />
          <p className="text-2xl font-extrabold text-white tracking-widest drop-shadow-lg">SHOPPER</p>
        </div>
        <ul className="flex flex-wrap gap-6 md:gap-10 text-lg font-semibold text-white/80">
          <li className="hover:text-pink-400 transition-colors cursor-pointer">Company</li>
          <li className="hover:text-pink-400 transition-colors cursor-pointer">Products</li>
          <li className="hover:text-pink-400 transition-colors cursor-pointer">Offices</li>
          <li className="hover:text-pink-400 transition-colors cursor-pointer">About</li>
          <li className="hover:text-pink-400 transition-colors cursor-pointer">Contact</li>
        </ul>
        <div className="flex gap-4">
          <div className="bg-white/20 p-3 rounded-full shadow-lg hover:bg-pink-400/30 transition-all cursor-pointer">
            <img src={instagram_icon} alt="Instagram Icon" className="h-7 w-7" />
          </div>
          <div className="bg-white/20 p-3 rounded-full shadow-lg hover:bg-pink-400/30 transition-all cursor-pointer">
            <img src={pinterest_icon} alt="Pinterest Icon" className="h-7 w-7" />
          </div>
          <div className="bg-white/20 p-3 rounded-full shadow-lg hover:bg-pink-400/30 transition-all cursor-pointer">
            <img src={whatsapp_icon} alt="Whatsapp Icon" className="h-7 w-7" />
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl">
        <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full mb-4 shadow-lg" />
        <p className="text-center text-white/60 text-sm">Copyright © 2023 - All Rights Reserved</p>
      </div>
    </footer>
  )
}
export default Footer