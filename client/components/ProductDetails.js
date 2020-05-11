import React from 'react'
import {connect, useSelector} from 'react-redux'
import {thunkCreateOrder, thunkAddToOrder} from '../store'
import axios from 'axios'

const ProductDetails = ({currentProduct, orders, user, cart, createCart, addItem}) => {

  const addToCart = () => {
    cart ? addItem(currentProduct, cart) : createCart(currentProduct, user)
  }

  return (
    <div>
      <div id='spacer'/>
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
    </div>
  )
}

const mapState = ({products, orders, user}, ownProps) => {
  const currentProduct = products.find(
    product => product.id === ownProps.match.params.id
  )
  const cart = orders.find(order => order.status === 'Cart')

  return {
    currentProduct,
    orders,
    user,
    cart
  }
}

const mapDispatch = dispatch => {
  return {
    createCart(product, user) { dispatch(thunkCreateOrder(product, user)) },
    addItem(product, cart) { dispatch(thunkAddToOrder(product, cart))}
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
