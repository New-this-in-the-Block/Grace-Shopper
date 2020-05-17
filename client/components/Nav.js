import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import history from '../history'

export default function Nav() {
  const [search, setSearch] = useState('')
  const user = useSelector(state => state.user)
  const categories = useSelector(state => state.categories)
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  const searchSubmit = ev => {
    ev.preventDefault()
    history.push(`/products/?${search}`)
  }

  if (!categories[0]) {
    return null
  }
  const ipa = categories.find(cat => cat.name === 'IPA')
  const lager = categories.find(cat => cat.name === 'Lager')
  const stout = categories.find(cat => cat.name === 'Stout')
  const pinot = categories.find(cat => cat.name === 'Pinot')
  const cab = categories.find(cat => cat.name === 'Cabernet')
  const char = categories.find(cat => cat.name === 'Chardonnay')
  const beer = products.filter(pro => pro.alcohol === 'Beer')
  const wine = products.filter(pro => pro.alcohol === 'Wine')
  return (
    <nav className='topnav'>
      <Link to="/home">
        <img width="73%" src="/img/logo.jpg" />
      </Link>
      <Link to="/products/page/1">All Drinks</Link>
      <div id="styleDropdown">
        <Link to="/products/page/:id">Beer ({beer.length})</Link>
        <div id="styleContent">
          <Link to={`/products/categories/${ipa.id}`}>
            IPA ({ipa.products.length})
          </Link>
          <Link to={`/products/categories/${lager.id}`}>
            Lager ({lager.products.length})
          </Link>
          <Link to={`/products/categories/${stout.id}`}>
            Stout ({stout.products.length})
          </Link>
        </div>
      </div>
      <div id="styleDropdown">
        <Link to="/products/page/:id">Wine ({wine.length})</Link>
        <div id="styleContent">
          <Link to={`/products/categories/${pinot.id}`}>
            Pinot ({pinot.products.length})
          </Link>
          <Link to={`/products/categories/${cab.id}`}>
            Cabernet ({cab.products.length})
          </Link>
          <Link to={`/products/categories/${char.id}`}>
            Chardonnay ({char.products.length})
          </Link>
        </div>
      </div>
      <div id="search">
        <img width="20px" src="/img/search.jpg" />
        <form onSubmit={searchSubmit}>
          <input onChange={ev => setSearch(ev.target.value)} />
        </form>
      </div>
      {user.id ? (
        <div id="navLogin">
          <img width="20px" src="/img/user.jpg" />
          {/* //if admin Link to='/admin' */}
          {user.isAdmin ? (
            <Link to="/admin">{user.email}</Link>
          ) : (
            <Link to="/profile">{user.email}</Link>
          )}
          <span className="horDivider" />
          <a href="#" onClick={() => dispatch(logout())}>
            Logout
          </a>
        </div>
      ) : (
        <div id="navLogin">
          <img width="20px" src="/img/user.jpg" />
          <Link to="/login">Login</Link>
          <span className="horDivider" />
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <Link to="/cart">
        <img width="73%" src="/img/cart.jpg" />
      </Link>
    </nav>
  )
}
