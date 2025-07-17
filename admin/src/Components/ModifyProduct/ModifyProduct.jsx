import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import upload_area from "../../assets/upload_area.svg";

const ModifyProduct = () => {
  const { id: routeId } = useParams();
  const [productId, setProductId] = useState(routeId || "");
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (routeId) {
      setProductId(routeId);
      handleFetch(routeId);
    }
    // eslint-disable-next-line
  }, [routeId]);

  const handleFetch = async (fetchId) => {
    setLoading(true);
    setError("");
    setSuccess("");
    setProduct(null);
    setImage(null);
    try {
      const resp = await fetch(`http://localhost:4000/product/${fetchId || productId}`);
      if (!resp.ok) throw new Error("Product not found");
      const data = await resp.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    let updatedProduct = { ...product };
    // If a new image is uploaded, upload it first
    if (image) {
      let responseData;
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
        updatedProduct.image = responseData.image_url;
      } else {
        setError("Image upload failed");
        setLoading(false);
        return;
      }
    }
    await fetch("http://localhost:4000/modifyProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setSuccess("Product updated successfully.");
        } else {
          setError("Update failed.");
        }
      })
      .catch(() => setError("Update failed."));
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center justify-center pt-24 overflow-auto">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-2 sm:p-6 md:p-10 border border-blue-700 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8 text-white tracking-wide drop-shadow text-center">
          Modify Product
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
          />
          <button
            onClick={() => {
              if (productId && productId !== routeId) {
                window.location.href = `/modifyproduct/${productId}`;
              } else {
                handleFetch();
              }
            }}
            disabled={!productId || loading}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:opacity-50"
          >
            Fetch
          </button>
        </div>
        {error && <div className="text-red-400 mb-2 text-center">{error}</div>}
        {success && <div className="text-green-400 mb-2 text-center">{success}</div>}
        {loading && <div className="text-blue-300 mb-2 text-center">Loading...</div>}
        {product && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
            <div className="mb-2">
              <label className="block text-blue-200 font-medium mb-1">Product Name</label>
              <input
                name="name"
                value={product.name || ""}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-blue-200 font-medium mb-1">Old Price</label>
                <input
                  name="old_price"
                  value={product.old_price || ""}
                  onChange={handleChange}
                  placeholder="Old Price"
                  type="number"
                  inputMode="numeric"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-blue-200 font-medium mb-1">New Price</label>
                <input
                  name="new_price"
                  value={product.new_price || ""}
                  onChange={handleChange}
                  placeholder="New Price"
                  type="number"
                  inputMode="numeric"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-blue-200 font-medium mb-1">Category</label>
              <select
                name="category"
                value={product.category || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
              >
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-blue-200 font-medium mb-1">Sold</label>
                <input
                  name="sold"
                  value={product.sold || ""}
                  onChange={handleChange}
                  placeholder="Sold"
                  type="Number"
                  inputMode="numeric"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-blue-200 font-medium mb-1">Stock</label>
                <input
                  name="stock"
                  value={product.stock || ""}
                  onChange={handleChange}
                  placeholder="Stock"
                  type="Number"
                  inputMode="numeric"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-blue-200 font-medium mb-1">Product Image</label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="file-input"
                  className="cursor-pointer w-24 h-24 flex items-center justify-center bg-gray-900 border-2 border-dashed border-blue-700 rounded-xl hover:bg-blue-950 transition"
                >
                  <img
                    src={image ? URL.createObjectURL(image) : product.image || upload_area}
                    className="object-contain w-16 h-16 opacity-80"
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
                {product.image && !image && (
                  <span className="text-blue-300 text-xs break-all">Current image</span>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-700 via-green-800 to-green-900 hover:from-green-800 hover:to-green-950 text-white font-semibold rounded-lg shadow-lg transition text-lg tracking-wide border border-green-700 mt-2"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModifyProduct;
