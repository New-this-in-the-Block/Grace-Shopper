import React from 'react'
import {connect} from 'react-redux'

export const Home = ({products}) => {
  console.log('products', products)
  if (!products) {
    return <span>Still Loading ...</span>
  }
  return (
    <ul>{products.map(product => <li key={product.id}>{product.name}</li>)}</ul>
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Home)
