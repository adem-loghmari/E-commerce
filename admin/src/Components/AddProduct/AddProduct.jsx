import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
    stock: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const Add_Product = async () => {
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "aplication/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) =>
          data.success ? alert("Product Added") : alert("failed")
        );
    }
  };

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center pt-24 overflow-auto">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-6 border border-blue-700">
        <h2 className="text-2xl font-bold mb-8 text-white tracking-wide drop-shadow">
          Add New Product
        </h2>
        <div className="mb-6">
          <label className="block text-blue-200 font-medium mb-2">
            Product Title
          </label>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here..."
            className="w-full px-4 py-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder-blue-300"
          />
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-blue-200 font-medium mb-2">Price</label>
            <input
              value={productDetails.old_price}
              onChange={changeHandler}
              type="text"
              name="old_price"
              placeholder="Type here..."
              className="w-full px-4 py-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder-blue-300"
            />
          </div>
          <div className="flex-1">
            <label className="block text-blue-200 font-medium mb-2">
              Offer Price
            </label>
            <input
              value={productDetails.new_price}
              onChange={changeHandler}
              type="text"
              name="new_price"
              placeholder="Type here..."
              className="w-full px-4 py-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder-blue-300"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-blue-200 font-medium mb-2">
            Product Category
          </label>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="w-full px-4 py-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-blue-200 font-medium mb-2">
            Product Stock
          </label>
          <input
            value={productDetails.stock}
            onChange={changeHandler}
            type="number"
            name="stock"
            placeholder="Type here..."
            className="w-full px-4 py-2 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder-blue-300"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="file-input"
            className="block text-blue-200 font-medium mb-2"
          >
            Product Image
          </label>
          <div className="flex items-center justify-center">
            <label
              htmlFor="file-input"
              className="cursor-pointer w-40 h-40 flex items-center justify-center bg-gray-900 border-2 border-dashed border-blue-700 rounded-xl hover:bg-blue-950 transition"
            >
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                className="object-contain w-24 h-24 opacity-80"
                alt="Upload Preview"
              />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
        </div>
        <button
          onClick={() => Add_Product()}
          className="w-full py-3 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-semibold rounded-lg shadow-lg transition text-lg tracking-wide border border-blue-700"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
