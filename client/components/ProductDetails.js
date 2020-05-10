import React from 'react'
import {connect} from 'react-redux'

const ProductDetails = ({currentProduct}) => {
  return (
    <div>
      <div id="spacer" />
      <div className="detailBox">
        <img
          className="detailPhoto"
          src={currentProduct && currentProduct.imageURL}
        />
        <div className="prodInfo">
          <h1>{currentProduct && currentProduct.name}</h1>
          <h3>${currentProduct && currentProduct.price}</h3>
          <p>{currentProduct && currentProduct.description}</p>
          <button type="submit">Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

const mapState = ({products}, ownProps) => {
  const currentProduct = products.find(
    product => product.id === ownProps.match.params.id
  )
  return {
    currentProduct
  }
}

export default connect(mapState)(ProductDetails)
