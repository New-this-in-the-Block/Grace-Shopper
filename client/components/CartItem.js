import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {thunkUpdateOrder, thunkRemoveFromOrder} from '../store'

export default function CartItem({item}) {
  const [quantity, setQuantity] = useState(item.quantity)
  const dispatch = useDispatch()

  const update = (quantity, item) => {
    if (quantity*1 !== item.quantity*1) dispatch(thunkUpdateOrder(quantity, item.id))
  }

  const destroy = (item) => dispatch(thunkRemoveFromOrder(item.id))

  if (!item) return <h2>Loading...</h2>  
  return (
    <div className="cartItem">
      <span><img className="cartPhoto" src={item.product.imageURL} /></span>
      <Link to={`/products/${item.productId}`}>{item.product.name}</Link>
      <span>${item.product.price}/each</span>
      <span>
      <input className="quantityCard" type="number" min="1" max={item.product.quantity} step="1" value={quantity} onChange={ev => setQuantity(ev.target.value)} size="6"></input>
        <button className="cartUpdate" onClick={() => update(quantity, item)}>Update</button>
        <button className="cartUpdate" onClick={() => destroy(item)}>Remove</button>
      </span>
      <span className='bold'>${(item.quantity * item.product.price).toFixed(2)}</span>
    </div>
  )
}