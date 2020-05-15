import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {thunkUpdateOrder} from '../store'

export default function LineItem({item}) {

  if (!item) return <h2>Loading...</h2>  
  return (
    <div className="lineItem">
      <span><img className="linePhoto" src={item.product.imageURL} /></span>
      <Link to={`/products/${item.productId}`}>{item.product.name}</Link>
      <span>${item.product.price}/each</span>
      <span>({item.quantity})
      </span>
      <span className='bold'>${(item.quantity * item.product.price).toFixed(2)}</span>
    </div>
  )
}
