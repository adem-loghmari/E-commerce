import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import Breadcrums from "../Breadcrums/Breadcrums";
const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <section className="w-full flex items-center justify-center py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 min-h-[80vh]">
      <div>
        <Breadcrums product={product} />
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex-1 flex flex-col items-center">
            <div className="flex gap-3 mb-6">
              {[1, 2, 3, 4].map((_, i) => (
                <img
                  key={i}
                  src={product.image}
                  alt="thumb"
                  className="h-16 w-16 object-cover rounded-xl border-2 border-white/30 shadow-md hover:scale-105 transition-transform"
                />
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl bg-white/20">
              <img
                src={product.image}
                className="w-72 h-80 object-contain hover:scale-105 transition-transform duration-300"
                alt={product.name}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6 justify-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={star_icon} alt="star" className="h-6 w-6" />
              ))}
              <img src={star_dull_icon} alt="star dull" className="h-6 w-6" />
              <p className="text-pink-400 font-semibold ml-2">(122)</p>
            </div>
            <div className="flex items-end gap-4 mb-2">
              <div className="text-lg line-through text-gray-400">
                ${product.old_price}
              </div>
              <div className="text-2xl font-bold text-pink-400 drop-shadow">
                ${product.new_price}
              </div>
            </div>
            <div className="text-white/80 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              blandit, magna eget aliquam pulvinar. Proin sapien magna,
              tincidunt at libero id, fringilla consectetur diam.
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Select size</h2>
              <div className="flex gap-3">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div
                    key={size}
                    className="px-4 py-2 bg-white/20 text-white rounded-full font-semibold shadow hover:bg-pink-400/40 hover:text-pink-100 cursor-pointer transition-all border border-white/30"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => addToCart(product.id)}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-lg font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-transform backdrop-blur-lg"
            >
              ADD TO CART
            </button>
            <p className="mt-4 text-white/70">
              <span className="font-bold text-white">Category :</span> Women,
              T-shirt, Crop Top
            </p>
            <p className="text-white/70">
              <span className="font-bold text-white">Tags :</span> Modern,
              Latest
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDisplay;
