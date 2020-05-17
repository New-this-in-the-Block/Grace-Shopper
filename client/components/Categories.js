import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'


const Categories = ({filteredProducts}) => { 
  return (
    <div>
      <div id='categoriesBanner'>
        <h1 id='categoriesH'></h1>
      </div>
      <ul className="productCards">
        {filteredProducts &&
          filteredProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({products}, ownProps) => {
  const filteredProducts = products.filter(
    product => product.categoryId === ownProps.match.params.id
  )
  return {
    filteredProducts,
  }
}

export default connect(mapStateToProps, null)(Categories)
