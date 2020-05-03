import React, {Component} from 'react'
import {connect} from 'react-redux'

const ProductCard = product => {
  return (
    <li className="productCard">
      <div className="prodImgBox">
        <img className="productImg" src={product.imageURL} />
      </div>
      <h3 className="prodName">{product.name}</h3>
      <h4 className="prodPrice">${product.price}</h4>
    </li>
  )
}

export default ProductCard
