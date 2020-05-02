import React from 'react'
import {connect} from 'react-redux'

const Products = ({products}) => {
  return (
    <div>
      <ul>{products.map(product => product.name)}</ul>
    </div>
  )
}

const mapState = ({products}) => {
  return {
    products
  }
}

export default connect(mapState)(Products)
