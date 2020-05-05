import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export default function Nav() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <nav>
      <Link to="/products">
        <img src="/img/logo.jpg" />
      </Link>
      <Link to="/products">All Drinks ()</Link>
      <div id="styleDropdown">
        <Link to="/">Beer ()</Link>
        <div id="styleContent">
          <Link to="/">Ipa ()</Link>
          <Link to="/">Lager ()</Link>
          <Link to="/">Stout ()</Link>
        </div>
      </div>
      <div id="styleDropdown">
        <Link to="/">Wine ()</Link>
        <div id="styleContent">
          <Link to="/">Pinot ()</Link>
          <Link to="/">Merlot ()</Link>
        </div>
      </div>
      {user.id ? (
        <div id="navLogin">
          <Link to="/profile">{user.email}</Link>
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
