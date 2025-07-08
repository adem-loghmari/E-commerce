import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((resp) => resp.json())
      .then((data) =>
        data.success
          ? alert(`Product with the id of ${id} has been deleted`)
          : alert("Deletion failed")
      );
    await fetchInfo();
  };

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center justify-center pt-24 overflow-auto">
      <div className="w-full max-w-5xl bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-2 sm:p-6 md:p-10 border border-blue-700 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8 text-white tracking-wide drop-shadow text-center">
          All Products
        </h1>
        <div className="hidden sm:grid grid-cols-7 gap-4 bg-gray-900/80 rounded-t-xl px-2 sm:px-6 py-2 sm:py-4 font-semibold text-blue-200 text-base sm:text-lg">
          <span>Product</span>
          <span>Title</span>
          <span>Old Price</span>
          <span>New Price</span>
          <span>Category</span>
          <span className="text-center">Sold</span>
          <span>Remove</span>
        </div>
        <div className="divide-y divide-blue-900 bg-gray-950/80 rounded-b-xl shadow">
          {allproducts.map((product, index) => (
            <div
              key={product.id || index}
              className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-4 items-center px-2 sm:px-6 py-3 hover:bg-blue-950/60 transition text-sm sm:text-base"
            >
              <div className="flex justify-center sm:block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg border border-blue-900 bg-gray-900 mx-auto sm:mx-0"
                />
              </div>
              <span className="truncate text-white text-center sm:text-left">
                {product.name}
              </span>
              <span className="text-blue-300 text-center sm:text-left">
                ${product.old_price}
              </span>
              <span className="text-blue-400 font-bold text-center sm:text-left">
                ${product.new_price}
              </span>
              <span className="text-blue-200 text-center sm:text-left">
                {product.category}
              </span>
              <span className="text-pink-300 font-semibold text-center">
                {product.sold ?? 0}
              </span>
              <div className="flex justify-center sm:block">
                <button
                  onClick={() => removeProduct(product.id)}
                  className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-700/20 hover:bg-red-700/40 transition"
                  title="Remove product"
                >
                  <img
                    src={cross_icon}
                    alt="Remove"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
