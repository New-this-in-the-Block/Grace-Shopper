import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export default function Nav(props) {
  const user = useSelector(state => state.user.email)
  const dispatch = useDispatch()

  return (
    <nav>
      <h2>Temp Name</h2>
      <Link>All Beer()</Link>
      <Link>All Wine()</Link>
      <div id="categoryDropdown">
        <Link>Categories()</Link>
        <div id="categoryContent">
          Beer
          <Link>Ipa()</Link>
          <Link>Lager()</Link>
          <Link>Stout()</Link>
          <div className="divider" />
          Wine
          <Link>Pinot()</Link>
          <Link>Merlot()</Link>
        </div>
      </div>
      <div id="navLogin">
        {user ? (
          <span>{user.email}</span>
        ) : (
          <span>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </span>
        )}
        <Link>Cart</Link>
      </div>
    </nav>
  )
}
