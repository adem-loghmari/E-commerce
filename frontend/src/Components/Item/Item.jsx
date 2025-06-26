import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

const Item = (props) => {
  return (
    <div className="item w-full flex flex-col items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all min-h-80">
      <Link to={`/product/${props.id}`} className="w-full flex items-center justify-center mb-3">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-56 object-contain mb-2"
          onClick={() => window.scrollTo(0,0)}
        />
      </Link>
      <p className="text-base font-semibold text-gray-900 text-center mb-2 w-full truncate">{props.name}</p>
      <div className="flex items-end gap-2 w-full justify-center">
        <span className="text-lg font-bold text-blue-600">${props.new_price}</span>
        <span className="text-sm text-gray-400 line-through">${props.old_price}</span>
      </div>
    </div>
  )
}

export default Item