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
        <Link to="/products">Beer ()</Link>
        <div id="styleContent">
          {/* Todo - change manually input id and links to a map function */}

          <Link to="/products/categories/b2f75885-8d97-4b65-beeb-56eeeda65764">
            Ipa ()
          </Link>
          <Link to="/products/categories/f9be5aa7-479a-433c-89c2-6d59680c7d47">
            Lager ()
          </Link>
          <Link to="/products/categories/f5f249df-c2a6-4182-8d5d-60053277c11a">
            Stout ()
          </Link>
        </div>
      </div>
      <div id="styleDropdown">
        <Link to="/products">Wine ()</Link>
        <div id="styleContent">
          {/* Todo - change manually input id and links to a map function */}

          <Link to="/products/categories/c1fa7795-8a3f-490b-8631-ef72f83aa3a0">
            Pinot ()
          </Link>
          <Link to="/products/categories/9a3c79d6-4cfd-4582-8d07-1cb78bdfdbfd">
            Chardonnay ()
          </Link>
          <Link to="/products/categories/8cda84a2-817b-45ca-a0b6-18120e65976b">
            Cabernet ()
          </Link>
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
