import React from 'react'
import {useSelector} from 'react-redux'

export default function Profile() {
  const user = useSelector(state => state.user)
  const products = useSelector(state => state.products)

  return <h3>{user.email}'s Profile</h3>
}
