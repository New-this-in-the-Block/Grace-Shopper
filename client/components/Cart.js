import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {thunkLoadMyOrders} from '../store'

export default function Cart() {
  const user = useSelector(state => state.user)
  const [cart] = useSelector(state => state.orders.filter(order => order.status === 'Cart'))
  const dispatch = useDispatch()

  useEffect(
    () => {
      user.id && dispatch(thunkLoadMyOrders(user.id))
    },
    [user]
  )

   if (!cart) return (
    <h1>Your cart is empty buy some <Link to='/products'>products</Link></h1>
  )

  return (
    <div>
      {!cart.lineItems.length 
      ? <h1>Your cart is empty buy some <Link to='/products'>products</Link></h1>
      : <div>
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
        </div>
      }

    </div>
  )
}