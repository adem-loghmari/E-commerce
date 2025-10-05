import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = () => {
  const [new_collections, setNew_Collections] = useState([]);
  useEffect(() => {
    fetch("/api/newcollections")
      .then((resp) => resp.json())
      .then((data) => setNew_Collections(data));
  }, []);
  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex flex-col items-center" id="new-collection">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wider mb-2 drop-shadow-lg">
        NEW COLLECTIONS
      </h1>
      <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full mb-10 shadow-lg" />
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {new_collections.map((item, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4 hover:scale-105 transition-transform flex items-center justify-center min-h-72"
          >
            <div className="w-full flex items-center justify-center">
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default NewCollections;
