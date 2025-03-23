import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => fetchInfo, []);
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
    <div className="listproduct">
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img src={product.image} className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  onClick={() => removeProduct(product.id)}
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
