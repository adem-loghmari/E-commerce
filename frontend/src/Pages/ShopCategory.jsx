import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const {all_products} = useContext(ShopContext)
  return (
    <section className="w-full min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 mb-8 px-4">
        <p className="text-white/90 text-lg font-semibold">
          <span className="text-pink-400 font-bold">Showing 1-12</span> out of 36 products
        </p>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full shadow-lg text-white font-semibold backdrop-blur-md cursor-pointer hover:bg-pink-400/20 transition">
          Sort by <img src={dropdown_icon} alt="drop down icon" className="h-5 w-5 ml-2"/>
        </div>
      </div>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 mb-12">
        {all_products.map((item,i)=>item.category===props.category ? (
          <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4 flex items-center justify-center min-h-72">
            <div className="w-full flex items-center justify-center">
              <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            </div>
          </div>
        ) : null)}
      </div>
      <div className="shopcategory-loadmore px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-lg font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer mb-4">
        Explore More
      </div>
    </section>
  )
}

export default ShopCategory;