import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {calculateTotal} from '../../script/utils'

export default function Cart() {
  const user = useSelector(state => state.user)
  const [cart] = useSelector(state => state.orders.filter(order => order.status === 'Cart'))
  const [subTotal, tax, total] = cart ? calculateTotal(cart) : [0,0,0]

   if (!cart || !cart.lineItems.length) return (
    <h1>Your cart is empty buy some <Link to='/products'>products</Link></h1>
  )

  return (
    <div>
      <div>
        <h1>Your Cart</h1>
          <ul>
            {
            cart.lineItems.map( item => (
              <li key={item.id}>
              <Link to={`/products/${item.productId}`}>
                {item.product.name}
              </Link>
              ({item.quantity}) for ${item.quantity * item.product.price}
            </li>
            ))
            }
          </ul>
          Subtotal: {subTotal}
          <br />Tax(8%): {tax}
          <br />Total: {total}
        </div>
      <button>Checkout</button>
    </div>
  )
}