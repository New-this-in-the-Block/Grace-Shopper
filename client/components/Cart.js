import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {calculateTotal} from '../../script/utils'
import StripeCheckout from 'react-stripe-checkout'
import CartItem from './CartItem'
import axios from 'axios'
import history from '../history'
import {thunkUpdateOrderStatus, thunkLoadMyOrders, thunkLoadMyCart} from '../store'
import BottomNav from './BottomNav'


export default function Cart() {
  const user = useSelector(state => state.user)
  const [cart] = useSelector(state => state.orders.filter(order => order.status === 'Cart'))
  const [subTotal, tax, total] = cart ? calculateTotal(cart) : [0,0,0]
  const dispatch = useDispatch()

  useEffect(
    () => {
      if (user.id)dispatch(thunkLoadMyOrders(user.id)) 
      else if (localStorage.getItem('cart')) dispatch(thunkLoadMyCart(localStorage.getItem('cart')))
    },
    []
  )

  if (!cart || !cart.lineItems.length) return (
    <div id='emptyH'>
      <div id='cartH'>
        <h1>Your Cart</h1>
        <h2 >Your cart is empty buy some <Link to='/products'>products</Link></h2>
      </div>
    </div>
  )

  const handleToken = async (token) => {
    dispatch(thunkUpdateOrderStatus({
      id: cart.id,
      status: 'Processing'
    }))
    if (localStorage.getItem('cart')) localStorage.removeItem('cart')
    user.id ? history.push('/profile') : history.push('/signup')
    const response = await axios.post('/api/orders/cart', {
      total, 
      token
    })
    const {status} = response.data
  }
  return (
    <div>
      <div>
        <div id='cartBanner'>
          <h1 id='cartH'>Cart</h1>
        </div>
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
                  <span>Tax(8.875%): </span> <span className='bold'> ${tax}</span>
                    </span>
                  <span>
                  <span>Total: </span> <span className='bold'> ${total}</span>
                    </span>
              </li>
          </ul>
        </div>
        <div id='stripeButton'>
          <StripeCheckout 
          stripeKey='pk_test_0ERHKADFrWWEg53FQw37D3fo00viT3HemM'
          token={handleToken}
          billingAddress
          shippingAddress
          amount={total * 100}
          />
        </div>
        <BottomNav />
    </div>
  )
}