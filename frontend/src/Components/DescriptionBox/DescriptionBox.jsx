import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className="descriptionbox w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
      <div className="descriptionbox-navigator flex gap-2 mb-6">
        <div className="descriptionbox-nav-box px-6 py-2 rounded-full font-bold text-white bg-blue-600 shadow cursor-pointer">Description</div>
        <div className="descriptionbox-nav-box px-6 py-2 rounded-full font-bold text-blue-600 bg-blue-100 cursor-pointer">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description text-gray-700 text-base leading-relaxed">
        <p>
          E-commerce, short for electronic commerce, is the buying and selling of goods and services online. Imagine a virtual marketplace where you can browse products, compare prices from different sellers, and make purchases with just a few clicks. E-commerce websites offer vast selection, convenience, and often competitive pricing.
          <br/>
          <br/>
          With secure payment gateways and reliable delivery services, you can shop from the comfort of your home and receive your items at your doorstep. From fashion apparel and electronics to groceries and furniture, e-commerce caters to almost every need. It's revolutionized retail, giving both businesses and consumers a global platform to connect.
        </p>
      </div>
    </div>
  )
}
export default DescriptionBox