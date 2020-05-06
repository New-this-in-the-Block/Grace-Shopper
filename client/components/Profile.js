import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {thunkLoadMyOrders} from '../store'
import {Link} from 'react-router-dom'

export default function Profile() {
  const user = useSelector(state => state.user)
  const orderData = useSelector(state => state.orders)
  const dispatch = useDispatch()

  useEffect(
    () => {
      user.id && dispatch(thunkLoadMyOrders(user.id))
    },
    [user]
  )

  return (
    <div id="profile">
      <h3>{user.email}'s Profile</h3>
      <h4>Orders:</h4>
      <ul>
        {orderData.map(order => {
          return (
            <li key={order.id}>
              Order from {order.createdAt}
              <ul>
                {order.lineItems.map(item => (
                  <li key={item.id}>
                    <Link to={`/products/${item.productId}`}>
                      {item.product.name}
                    </Link>
                    ({item.quantity}) for ${item.quantity * item.product.price}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
