import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {thunkUpdateOrder} from '../store'

export default function CartItem({item}) {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  if (!item) return <h2>Loading...</h2>  
  return (
    <div className="cartItem">
      <span><img className="cartPhoto" src={item.product.imageURL} /></span>
      <Link to={`/products/${item.productId}`}>{item.product.name}</Link>
      <span>${item.product.price}/each</span>
      <span>
      <input className="quantityCard" type="number" min="1" max={item.product.quantity} step="1" value={item.quantity} onChange={ev => setQuantity(ev.target.value)} size="6"></input>
        <button className="cartUpdate" onClick={() => dispatch(thunkUpdateOrder(quantity, item.id))}>Update</button>
      </span>
      <span className='bold'>${(item.quantity * item.product.price).toFixed(2)}</span>
    </div>
  )
}