import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

const Products = ({products}) => {
  return (
    <ul className="productCards">
      {products &&
        products.map(product => <ProductCard {...product} key={product.id} />)}
    </ul>
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Products)
