import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import AdminProdList from './AdminProdList'
import ProdForm from './ProdForm'

const AdminProfile = () => {
  return (
    <div>
      <p>Hello Admin,</p>
      <div>
        <nav id="adminNav">
          {/* <NavLink>Orders</NavLink> */}
          <NavLink className="selected" to="/admin/addproduct">
            Add Product
          </NavLink>
          <NavLink className="selected" to="/admin/editproduct">
            Edit Product
          </NavLink>
        </nav>
        <ProdForm />
        <AdminProdList />
      </div>
    </div>
    // <div>
    //   <Tabs id='adminNav'>
    //     <Tab eventKey='AdminProdList' title='Edit Products'><AdminProdList /></Tab>
    //     <Tab eventKey='ProdForm' title='Add Product'><ProdForm /></Tab>
    //   </Tabs>
    // </div>
  )
}

export default AdminProfile
