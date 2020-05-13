import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {calculateTotal} from '../../script/utils'
import CartItem from './CartItem'

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
          <ul className="cartList">
            <li className="cartItem" key="header">
              <span>Product</span>
              <span></span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </li>
            {
            cart.lineItems.map( item => (
              <li key={item.id}>

                <CartItem item={item}/>
              </li>
            ))
            }
              <li className="cartItemFooter" key="footer">
                  <span>
                    <span>Subtotal: </span> <span className='bold'> ${subTotal}</span>
                  </span>
                  <span>
                  <span>Tax(8%): </span> <span className='bold'> ${tax}</span>
                    </span>
                  <span>
                  <span>Total: </span> <span className='bold'> ${total}</span>
                    </span>
              </li>
          </ul>
        </div>
      <button>Checkout</button>
    </div>
  )
}