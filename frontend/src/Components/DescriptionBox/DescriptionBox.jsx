import { useState } from 'react';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-8">
      <div className=" flex gap-2 mb-6">
        <div 
          className={`descriptionbox-nav-box px-6 py-2 rounded-full font-bold cursor-pointer transition-colors ${
            activeTab === 'description' 
              ? 'text-white bg-blue-600 shadow' 
              : 'text-blue-600 bg-blue-100 hover:bg-blue-200'
          }`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </div>
        <div 
          className={`descriptionbox-nav-box px-6 py-2 rounded-full font-bold cursor-pointer transition-colors ${
            activeTab === 'reviews' 
              ? 'text-white bg-blue-600 shadow' 
              : 'text-blue-600 bg-blue-100 hover:bg-blue-200'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (122)
        </div>
      </div>

      <div className="min-h-[200px]">
        {activeTab === 'description' ? (
          <div className="text-gray-700 text-base leading-relaxed">
            <p>
              E-commerce, short for electronic commerce, is the buying and selling of goods and services online. Imagine a virtual marketplace where you can browse products, compare prices from different sellers, and make purchases with just a few clicks. E-commerce websites offer vast selection, convenience, and often competitive pricing.
              <br/><br/>
              With secure payment gateways and reliable delivery services, you can shop from the comfort of your home and receive your items at your doorstep. From fashion apparel and electronics to groceries and furniture, e-commerce caters to almost every need. It's revolutionized retail, giving both businesses and consumers a global platform to connect.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Reviews</h3>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">4.8 out of 5 (122 reviews)</span>
              </div>
            </div>

            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="review-item border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <h4 className="font-medium">Customer {i+1}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">2 days ago</p>
                </div>
              ))}
            </div>

            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;