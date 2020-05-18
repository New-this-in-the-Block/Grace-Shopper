import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {thunkCreateOrder, thunkAddToOrder, thunkLoadMyCart} from '../store/thunks'
import axios from 'axios'


const ProductCard = ({product, cart, user, addItem, createCart, createGuestCart}) => {
  const addToCart = async () => {
    if (!user.id) {
      if (cart) {
        addItem(1, product, cart.id)
      } else {
        console.log('make cart')
        const order = (await axios.post('/api/orders', {quantity: 1, productId: product.id, userId: user.id})).data
        localStorage.setItem('cart', order.id)
        createGuestCart(localStorage.getItem('cart'))
      }
    } else {
      cart ? addItem(1, product, cart.id) : createCart(1, product, user)
    }
  }

  return (
    <li className="productCard">
      <Link to={`/products/${product.id}`}>
        <div className="prodImgBox">
          <img className="productImg" src={product.imageURL} />
        </div>
        <h5 className="prodName">{product.name}</h5>
      </Link>
        <div className="priceCart">
          <h5 className="prodPrice">${product.price}</h5>
          <button id="cartButtonCard" type="submit" onClick={addToCart}></button>
        </div>
    </li>
  )
}

const mapState = ({orders, user}) => {
  const cart = orders.find(order => order.status === 'Cart')

  return {
    orders,
    user,
    cart
  }
}

const mapDispatch = dispatch => {
  return {
    createCart(quantity, product, user) { dispatch(thunkCreateOrder(quantity, product, user))},
    addItem(quantity, product, cartId) { dispatch(thunkAddToOrder(quantity, product, cartId))},
    createGuestCart(id) { dispatch(thunkLoadMyCart(id))}
  }
}

export default connect(mapState, mapDispatch)(ProductCard)