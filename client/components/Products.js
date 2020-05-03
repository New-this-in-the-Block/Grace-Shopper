import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

const Products = ({products}) => {
  console.log('here are the products', products)
  return (
    <ul>{product && products.map(product => <li>{product.id}</li>)}</ul>
    // <ul>{products.map(product => <ProductCard {...product} key={product.id}/>)}</ul>
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Products)
