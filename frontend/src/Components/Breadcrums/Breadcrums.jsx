import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const Breadcrums = (props) => {
    const {product} = props;
    return (
      <nav className="w-full max-w-5xl mx-auto flex items-center gap-2 bg-white/80 rounded-xl shadow px-6 py-3 mt-8 mb-6 text-gray-700 text-sm font-semibold">
        <span className="hover:text-blue-600 cursor-pointer">HOME</span>
        <img src={arrow_icon} alt="arrow" className="h-3 w-3 mx-1"/>
        <span className="hover:text-blue-600 cursor-pointer">SHOP</span>
        <img src={arrow_icon} alt="arrow" className="h-3 w-3 mx-1"/>
        <span className="capitalize hover:text-blue-600 cursor-pointer">{product.category}</span>
        <img src={arrow_icon} alt="arrow" className="h-3 w-3 mx-1"/>
        <span className="text-pink-600 font-bold truncate">{product.name}</span>
      </nav>
    )
}
export default Breadcrums;
