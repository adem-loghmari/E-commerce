import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_products,cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);
    return (
      <section className="w-full min-h-screen py-16 bg-gray-100 flex flex-col items-center mt-24">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8">
          <div className="grid grid-cols-6 gap-4 font-bold text-gray-700 text-lg border-b pb-4 mb-4">
            <span className="col-span-1">Product</span>
            <span className="col-span-2">Title</span>
            <span className="col-span-1">Price</span>
            <span className="col-span-1">Quantity</span>
            <span className="col-span-1">Total</span>
            <span className="col-span-1">Remove</span>
          </div>
          {all_products.map((e) => {
            if(cartItems[e.id]>0){
              return (
                <div key={e.id} className="grid grid-cols-6 gap-4 items-center border-b py-4 last:border-b-0">
                  <img src={e.image} alt="" className="h-20 w-20 object-contain rounded-xl bg-gray-50" />
                  <span className="col-span-2 text-gray-900 font-semibold">{e.name}</span>
                  <span className="text-blue-600 font-bold">${e.new_price}</span>
                  <span>
                    <button className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-bold cursor-default">{cartItems[e.id]}</button>
                  </span>
                  <span className="text-gray-900 font-bold">${e.new_price*cartItems[e.id]}</span>
                  <img className='h-7 w-7 cursor-pointer hover:scale-110 transition-transform' src={remove_icon} alt="remove" onClick={()=>removeFromCart(e.id)} />
                </div>
              )
            }
            return null;
          })}
          <div className="flex flex-col md:flex-row justify-between gap-8 mt-10">
            <div className="flex-1 bg-gray-50 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart Totals</h2>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-bold text-blue-600">${getTotalCartAmount()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl border-t pt-3 mt-3 font-bold">
                  <span>Total</span>
                  <span className="text-pink-500">${getTotalCartAmount()}</span>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-lg font-bold rounded-full shadow hover:scale-105 transition-transform">PROCEED TO CHECKOUT</button>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-6 shadow flex flex-col items-center justify-center">
              <p className="mb-4 text-gray-700">If you have a promocode, enter it here</p>
              <form className="flex gap-2 w-full max-w-xs">
                <input type="text" placeholder='Promo code' className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
}

export default CartItems;