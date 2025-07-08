import React, { useContext, useState } from 'react'
import {ShopContext} from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Alphabetical: A-Z', value: 'alpha-asc' },
  { label: 'Alphabetical: Z-A', value: 'alpha-desc' },
];

const ShopCategory = (props) => {
  const {all_products} = useContext(ShopContext)
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState('price-asc');

  const filtered = all_products.filter((product)=>product.category==props.category);
  let sorted = [...filtered];
  if (sort === 'price-asc') sorted.sort((a,b)=>a.new_price-b.new_price);
  if (sort === 'price-desc') sorted.sort((a,b)=>b.new_price-a.new_price);
  if (sort === 'alpha-asc') sorted.sort((a,b)=>a.name.localeCompare(b.name));
  if (sort === 'alpha-desc') sorted.sort((a,b)=>b.name.localeCompare(a.name));

  return (
    <section className="w-full min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 mb-8 px-4">
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <p className="text-white/90 text-lg font-semibold">
            <span className="text-pink-400 font-bold">Showing {filtered.length} products</span>
          </p>
          {sort && (
            <span className="text-xs text-blue-200 bg-blue-900/40 rounded-full px-3 py-1 w-fit mt-1 font-medium tracking-wide">
              Sorted by: {sortOptions.find(opt => opt.value === sort)?.label}
            </span>
          )}
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full shadow-lg text-white font-semibold backdrop-blur-md cursor-pointer hover:bg-pink-400/20 transition"
            onClick={() => setSortOpen((v) => !v)}
            type="button"
          >
            Sort by <img src={dropdown_icon} alt="drop down icon" className="h-5 w-5 ml-2"/>
          </button>
          {sortOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-10 text-gray-800 overflow-hidden">
              {sortOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`w-full text-left px-4 py-2 hover:bg-pink-100 transition ${sort===opt.value ? 'bg-pink-200 font-bold' : ''}`}
                  onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  type="button"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 mb-12">
        {sorted.map((item,i)=>(
          <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4 flex items-center justify-center min-h-72">
            <div className="w-full flex items-center justify-center">
              <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ShopCategory;