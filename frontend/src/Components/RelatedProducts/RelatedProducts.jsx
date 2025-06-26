import React from 'react'
import data_product from '../Assets/data'
import Item from '../Item/Item'
const RelatedProducts = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wider mb-2 drop-shadow-lg">Related Products</h1>
      <div className="h-1 w-24 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full mb-8 shadow-lg" />
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {data_product.map((item,i)=>(
          <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4 flex items-center justify-center min-h-72 hover:scale-105 transition-transform">
            <div className="w-full flex items-center justify-center">
              <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts