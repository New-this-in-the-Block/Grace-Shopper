import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

const Products = ({products}) => {
  return (
    <div>
      <ul className="productCards">
        {products &&
          products.map(product => (
            <ProductCard {...product} key={product.id} />
          ))}
      </ul>
      <hr />
      <p id="signature">© 2020, Craft Beer and Wine</p>
    </div>
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Products)
