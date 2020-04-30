import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
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
        <Link>Login</Link>
        <Link>Cart</Link>
      </div>
    </nav>
  )
}
