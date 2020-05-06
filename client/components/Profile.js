import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

export default function Profile() {
  const user = useSelector(state => state.user)
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  console.log(user)

  return <h3>{user.email}'s Profile</h3>
}
