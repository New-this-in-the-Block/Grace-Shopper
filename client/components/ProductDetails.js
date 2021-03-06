import React, {useState} from 'react'
import {connect} from 'react-redux'
import {thunkCreateOrder, thunkAddToOrder, thunkLoadMyCart} from '../store/thunks'
import axios from 'axios'

const ProductDetails = ({currentProduct, orders, user, cart, createCart, addItem, createGuestCart}) => {
  const [quantity, setQuantity] = useState(1)

  const addToCart = async() => {
    if (!user.id) {
      if (cart) {
        addItem(quantity, currentProduct, cart.id)
      } else {
        const order = (await axios.post('/api/orders', {quantity, productId: currentProduct.id, userId: user.id})).data
        localStorage.setItem('cart', order.id)
        createGuestCart(localStorage.getItem('cart'))
      }
    } else {
      cart ? addItem(quantity, currentProduct, cart.id) : createCart(quantity, currentProduct, user)
    }
  }

  if (!currentProduct) return <h2>Loading...</h2>

  return (
    <div>
      <div className="detailBox">
        <img
          className="detailPhoto"
          src={currentProduct && currentProduct.imageURL}
        />
        <div className="prodInfo">
          <h1>{currentProduct && currentProduct.name}</h1>
          <h3>${currentProduct && currentProduct.price}</h3>
          <p>{currentProduct && currentProduct.description}</p>
          <input className="quantityCard" type="number" min="1" max={currentProduct.quantity} step="1" value={quantity} onChange={ev => setQuantity(ev.target.value)} size="6"></input>
          <button className="cartButton" type="submit" onClick={addToCart}></button>
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
    createCart(quantity, product, user) { dispatch(thunkCreateOrder(quantity, product, user)) },
    addItem(quantity, product, cartId) { dispatch(thunkAddToOrder(quantity, product, cartId))},
    createGuestCart(id) { dispatch(thunkLoadMyCart(id))}
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
