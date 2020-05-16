import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {thunkLoadMyOrders} from '../store'
import {Link} from 'react-router-dom'
import Order from './Order'

export default function Profile() {
  const user = useSelector(state => state.user)
  const orderData = useSelector(state => state.orders.filter(order => order.status !== 'Cart'))
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
            <li className="itemList" key={order.id}>
              Order from {order.createdAt} Status: {order.status}
              <Order order={order} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
