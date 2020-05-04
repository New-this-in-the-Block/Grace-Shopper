import React from 'react'
import {connect} from 'react-redux'

const ProductDetails = ({currentProduct}, ownProps) => {
  return (
    <div className="detailBox">
      <img
        className="detailPhoto"
        src={currentProduct && currentProduct.imageURL}
      />
      <div className="prodInfo">
        <h1>{currentProduct && currentProduct.name}</h1>
        <h3>${currentProduct && currentProduct.price}</h3>
        <p>{currentProduct && currentProduct.description}</p>
        <button>Add To Cart</button>
      </div>
    </div>
  )
}

const mapState = ({products}, ownProps) => {
  const currentProduct = products.find(
    product => product.id === ownProps.match.params.id
  )
  return {
    currentProduct,
    ownProps
  }
}

export default connect(mapState)(ProductDetails)
