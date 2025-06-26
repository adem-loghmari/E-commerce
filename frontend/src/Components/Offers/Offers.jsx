import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl px-8 py-12 gap-10">
        <div className="flex-1 flex flex-col items-start gap-4 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-2">Exclusive</h1>
          <h1 className="text-5xl md:text-6xl font-extrabold text-pink-400 drop-shadow mb-2">Offer For You</h1>
          <p className="text-lg text-white/80 mb-4">ONLY ON BEST SELLERS PRODUCTS</p>
          <button className="mt-4 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-lg font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-transform backdrop-blur-lg">
            Check Now
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center z-10">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-white/20 p-4 md:p-8">
            <img src={exclusive_image} alt="exclusive image" className="w-64 md:w-80 h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Offers