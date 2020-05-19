import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import BottomNav from './BottomNav'


const Categories = ({filteredProducts}) => { 
  return (
    <div>
      <div id='categoriesBanner'>
        <h1 id='categoriesH'></h1>
      </div>
      <ul className="productCards">
        {filteredProducts && filteredProducts.map(product => (
            <ProductCard product={product} key={product.id} />
        ))}
      </ul>
      <BottomNav />
    </div>
  )
}

const mapStateToProps = ({products}, ownProps) => {
  console.log('own', ownProps)
  const filteredProducts = products.filter(product => product.categoryId === ownProps.match.params.id)
  return {
    filteredProducts,
  }
}

export default connect(mapStateToProps)(Categories)
