import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'

const Products = ({products}) => {
  const [displayProducts, setDisplayProducts] = useState(products)
  let search = location.search.slice(1)

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

  if (search)
    return (
      <div>
        <h2>searching for {search}</h2>
        <ul className="productCards">
          {displayProducts.map(product => (
            <ProductCard {...product} key={product.id} />
          ))}
        </ul>
      </div>
    )

  return (
    <ul className="productCards">
      {products &&
        products.map(product => <ProductCard {...product} key={product.id} />)}
    </ul>
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Products)
