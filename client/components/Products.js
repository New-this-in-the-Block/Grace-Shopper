import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

const Products = ({products}) => {
  const [displayProducts, setDisplayProducts] = useState(products)
  const search = location.search.slice(1)

  //filter the products if the search changes
  useEffect(
    () => {
      setDisplayProducts(
        products.filter(prod =>
          prod.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    },
    [search]
  )

  //if searching return the filtered products
  if (search)
    return (
      <div>
        <h2>
          searching for {search} ({displayProducts.length})
        </h2>
        <ul className="productCards">
          {displayProducts.map(product => (
            <ProductCard {...product} key={product.id} />
          ))}
        </ul>
      </div>
    )

  //if not searching return all products
  return (
    <ul className="productCards">
      {products &&
        products.map(product => <ProductCard {...product} key={product.id} />)}
    </ul>
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Products)
