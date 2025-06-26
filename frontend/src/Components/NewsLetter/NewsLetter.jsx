import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <section className="w-full py-16 flex justify-center items-center bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl px-8 py-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg text-center">Get Exclusive Offers on your E-mail</h1>
        <p className="text-white/80 mb-8 text-center">Subscribe to our newsletter and stay updated</p>
        <form className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="email"
            placeholder="Your E-mail address"
            className="w-full sm:w-auto flex-1 px-6 py-3 rounded-full bg-white/70 text-gray-800 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-transform backdrop-blur-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default NewsLetter