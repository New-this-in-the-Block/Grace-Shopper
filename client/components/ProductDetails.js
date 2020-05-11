import React from 'react'
import {connect, useSelector} from 'react-redux'
import {thunkLoadMyCart, thunkCreateOrder} from '../store'
import axios from 'axios'

const ProductDetails = ({currentProduct, user, getCart, createCart}) => {


  const addToCart = async () => {
    if (user.id === 0) return
    const cart = (await axios.get(`/api/orders/cart/${user.id}`)).data
    let lineItem = undefined
    if (cart) lineItem = cart.lineItems.find(item => item.productId === currentProduct.id)
    if (lineItem) {
      const quantity = lineItem.quantity + 1
      await axios.put(`/api/lineItems/${lineItem.id}`, {quantity}).data
    } else {
      lineItem = {quantity: 1, productId: currentProduct.id, orderId: cart.id}
      await axios.post('/api/lineItems', lineItem).data
    }
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

const mapState = ({products, user}, ownProps) => {
  const currentProduct = products.find(product => product.id === ownProps.match.params.id)
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
