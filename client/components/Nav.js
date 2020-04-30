import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      <h2>Beer Store</h2>
      <Link>Beer()</Link>
      <Link>Wine()</Link>
      <Link>Categories()</Link>
      <div id="navLogin">
        <Link>Login</Link>
        <Link>Cart</Link>
      </div>
    </nav>
  )
}
