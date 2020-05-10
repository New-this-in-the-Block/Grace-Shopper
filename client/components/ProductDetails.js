import React from 'react'
import {connect, useSelector} from 'react-redux'
import {thunkLoadMyCart, thunkCreateOrder} from '../store'
import axios from 'axios'

const ProductDetails = ({currentProduct, user, getCart, createCart}) => {


  const addToCart = async () => {
    console.log('add to cart!')
    const cart = (await axios.get(`/api/orders/cart/${user.id}`)).data
    const lineItem = {quantity: 1, productId: currentProduct.id, orderId: cart.id}
    const newLineItem = (await axios.post('/api/lineItems', lineItem)).data
  }

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
        <button type="submit" onClick={addToCart}>Add To Cart</button>
      </div>
    </div>
  )
}

const mapState = ({products, user}, ownProps) => {
  const currentProduct = products.find(
    product => product.id === ownProps.match.params.id
  )
  return {
    currentProduct,
    user
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: (id) => dispatch(thunkLoadMyCart(id))
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
