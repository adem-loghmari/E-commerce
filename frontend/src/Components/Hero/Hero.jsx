import React from 'react'
import './Hero.css'

import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 py-16 md:py-24 flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-6 gap-12 py-8">
        <div className="flex-1 flex flex-col items-center z-10">
          <h2 className="text-pink-400 text-lg font-semibold mb-2 tracking-widest animate-pulse">NEW ARRIVALS ONLY</h2>
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-lg mb-2">
              <p className="text-white text-2xl font-bold tracking-tight">New</p>
              <img src={hand_icon} alt="hand icon" className="h-8 w-8 animate-bounce" />
            </div>
            <p className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">Collections</p>
            <p className="text-4xl md:text-5xl font-bold text-pink-400 mt-2 drop-shadow">for everyone</p>
          </div>
          <a href='#new-collection' className="hero-latest-btn mt-8 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-lg font-bold rounded-full shadow-xl flex items-center gap-4 hover:scale-105 hover:shadow-2xl transition-transform backdrop-blur-lg">
            <span>Latest Collection</span>
            <img src={arrow_icon} alt="arrow icon" className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
export default Hero;
