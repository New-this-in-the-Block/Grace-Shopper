import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {thunkCreateOrder, thunkAddToOrder} from '../store'


const ProductCard = ({product, cart, user, addItem, createCart}) => {
  console.log('product', product)

  const addToCart = () => {
    cart ? addItem(1, product, cart.id) : createCart(1, product, user)
  }
  // if (!product.name) return <h2>Loading...</h2>

  return (
    <li className="productCard">
      <Link to={`/products/${product.id}`}>
        <div className="prodImgBox">
          <img className="productImg" src={product.imageURL} />
        </div>
        <h4 className="prodName">{product.name}</h4>
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
    addItem(quantity, product, cartId) { dispatch(thunkAddToOrder(quantity, product, cartId))}
  }
}

export default connect(mapState, mapDispatch)(ProductCard)