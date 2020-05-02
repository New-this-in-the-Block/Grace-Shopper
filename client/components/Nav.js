import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export default function Nav() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <nav>
      <img src="/img/logo.jpg" />
      <Link>All Drinks ()</Link>
      <div id="styleDropdown">
        <Link>Beer ()</Link>
        <div id="styleContent">
          <Link>Ipa ()</Link>
          <Link>Lager ()</Link>
          <Link>Stout ()</Link>
        </div>
      </div>
      <div id="styleDropdown">
        <Link>Wine ()</Link>
        <div id="styleContent">
          <Link>Pinot ()</Link>
          <Link>Merlot ()</Link>
        </div>
      </div>
      {user.id ? (
        <div id="navLogin">
          <span>{user.email}</span>
          <span className="horDivider" />
          <a href="#" onClick={() => dispatch(logout())}>
            Logout
          </a>
        </div>
      ) : (
        <div id="navLogin">
          <Link to="/login">Login</Link>
          <span className="horDivider" />
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <img src="/img/cart.jpg" />
    </nav>
  )
}
