import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export default function Nav() {
  const user = useSelector(state => state.user)
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
      {user.id ? (
        <div id="navLogin">
          <span>{user.email}</span>
          <a href="#" onClick={() => dispatch(logout())}>
            Logout
          </a>
        </div>
      ) : (
        <div id="navLogin">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <Link>Cart</Link>
    </nav>
  )
}
