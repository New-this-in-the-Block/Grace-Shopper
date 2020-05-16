import React from 'react'
import LineItem from './LineItem'
import {calculateTotal} from '../../script/utils'

export default function Order({order}) {
  const [subTotal, tax, total] = order ? calculateTotal(order) : [0,0,0]

  if (!order) return <h3>Loading...</h3>
  return (
    <ul className="orderlist">
      {order.lineItems.map(item => (
        <li key={item.id}>
          <LineItem item={item} />
        </li>
      ))}
      <li>
        <span>Total: </span> <span className='bold'> ${total}</span>
      </li>
    </ul> 
  )
}
