import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

export const Home = ({products}) => {
  return (
    // <ul>{products.map(product => <li key={product.id}>{product.name}</li>)}</ul>
    <ul className="productCards">
      {products &&
        products.map(product => <ProductCard {...product} key={product.id} />)}
    </ul>
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Home)
