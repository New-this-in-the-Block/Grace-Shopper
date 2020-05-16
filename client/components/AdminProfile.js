import React, {Component} from 'react'
import {NavLink, HashRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import AdminProdList from './AdminProdList'
import ProdForm from './ProdForm'
import AdminOrders from './AdminOrders'
import AdminUsers from './AdminUsers'
import {ToastContainer, toast} from 'react-toastify'


const AdminProfile = ({path}) => {
  return (
    <div>
      <div id='adminHello'>Welcome Admin</div>
      <div>
        <nav id="adminNav">
          {/* <NavLink>Orders</NavLink> */}
          <NavLink activeClassName="selected" to="/admin/addproduct">
            Add Product
          </NavLink>
          <NavLink activeClassName="selected" to="/admin/editproduct">
            Edit Product
          </NavLink>
          <NavLink activeClassName="selected" to="/admin/orders">
            All Orders
          </NavLink>
          <NavLink activeClassName="selected" to="/admin/users">
            All Users
          </NavLink>
        </nav>
      </div>
      {path === '/admin/editproduct' ? <AdminProdList /> : path === '/admin/addproduct' ?  <ProdForm /> : path === '/admin/orders' ? <AdminOrders /> : path === '/admin/users' ? <AdminUsers /> : ''}
    </div>
  )
}

export default AdminProfile
