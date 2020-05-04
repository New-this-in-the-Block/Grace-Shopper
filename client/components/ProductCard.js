import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const ProductCard = product => {
  return (
    <li className="productCard">
      <Link to={`/products/${product.id}`}>
        <div className="prodImgBox">
          <img className="productImg" src={product.imageURL} />
        </div>
        <h3 className="prodName">{product.name}</h3>
        <h4 className="prodPrice">${product.price}</h4>
      </Link>
    </li>
  )
}

export default ProductCard
