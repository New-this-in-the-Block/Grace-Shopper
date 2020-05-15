import React from 'react'
import {NavLink} from 'react-router-dom'
import AdminProdList from './AdminProdList'
import ProdForm from './ProdForm'
import AdminOrders from './AdminOrders'
import AdminUsers from './AdminUsers'

const AdminProfile = ({path}) => {
  return (
    <div>
      <div id='adminHello'>Welcome Admin</div>
      <div>
        <nav id="adminNav">
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
