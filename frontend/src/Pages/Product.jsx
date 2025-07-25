import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
const Product = () => {
  const {all_products} = useContext(ShopContext)
  const {productId} = useParams()
  const product = all_products.find((item)=>Number(productId)===item.id)
  return (
    <div className='pt-8'>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product