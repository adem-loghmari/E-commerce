import React, { useEffect, useState } from "react";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [confirmName, setConfirmName] = useState("");
  const [confirmId, setConfirmId] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => setAllProducts(data.sort((a, b) => a.id - b.id)));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const openDeleteModal = (product) => {
    setModalProduct(product);
    setConfirmName("");
    setConfirmId("");
    setDeleteError("");
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setModalProduct(null);
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (
      confirmName.trim() !== modalProduct.name.trim() ||
      String(confirmId).trim() !== String(modalProduct.id).trim()
    ) {
      setDeleteError("Name and ID must match the product exactly.");
      return;
    }
    await fetch("http://localhost:4000/removeProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: modalProduct.id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert(`Product with the id of ${modalProduct.id} has been deleted`);
          closeDeleteModal();
          fetchInfo();
        } else {
          setDeleteError("Deletion failed");
        }
      });
  };

  return (
    <div className="fixed lg:ml-36 inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center justify-center pt-24 overflow-auto">
      <div className="w-full  max-w-6xl bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-2 sm:p-6 md:p-10 border border-blue-700 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8 text-white tracking-wide drop-shadow text-center">
          All Products
        </h1>
        <div className="hidden sm:grid grid-cols-10 gap-4 bg-gray-900/80 rounded-t-xl px-2 sm:px-6 py-2 sm:py-4 font-semibold text-blue-200 text-base sm:text-lg">
          <span className="text-center">ID</span>
          <span>Product</span>
          <span>Title</span>
          <span>Old Price</span>
          <span>New Price</span>
          <span>Category</span>
          <span className="text-center">stock</span>
          <span className="text-center">Sold</span>
          <span>Modify</span>
          <span>Remove</span>
        </div>
        <div className="divide-y divide-blue-900 bg-gray-950/80 rounded-b-xl shadow">
          {allproducts.map((product, index) => (
            <div
              key={product.id || index}
              className="grid grid-cols-1 sm:grid-cols-10 gap-2 sm:gap-4 items-center px-2 sm:px-6 py-3 hover:bg-blue-950/60 transition text-sm sm:text-base"
            >
              <span className="text-blue-400 font-mono text-xs text-center break-all">
                {product.id}
              </span>
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
                {product.stock ?? 0}
              </span>
              <span className="text-pink-300 font-semibold text-center">
                {product.sold ?? 0}
              </span>
              <div className="flex justify-center">
                <a
                  href={`/modifyproduct/${product.id}`}
                  className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-700/20 hover:bg-blue-700/40 transition"
                  title="Modify product"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-4.243 1.415 1.415-4.243a4 4 0 01.94-1.414z"
                    />
                  </svg>
                </a>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => openDeleteModal(product)}
                  className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-700/20 hover:bg-red-700/40 transition"
                  title="Remove product"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Modal for delete confirmation */}
        {showModal && modalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-900 border-4 border-red-700 rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-red-400 mb-4 text-center">
                Are you sure you want to delete this product?
              </h2>
              <p className="text-blue-200 mb-2 text-center">
                This action cannot be undone. To confirm, type the product{" "}
                <span className="font-bold text-white">name</span> and{" "}
                <span className="font-bold text-white">ID</span> below:
              </p>
              <div className="w-full flex flex-col gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Product ID"
                  value={confirmId}
                  onChange={(e) => setConfirmId(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
              </div>
              {deleteError && (
                <div className="text-red-400 mb-2 text-center">{deleteError}</div>
              )}
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow-lg transition text-lg tracking-wide border border-red-900"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg shadow-lg transition text-lg tracking-wide border border-blue-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
