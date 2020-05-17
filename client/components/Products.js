import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import Paginate from './Paginate'

const Products = ({products}) => {
  const [displayProducts, setDisplayProducts] = useState(products)
  const [currentPage, setCurrentPage] = useState(1)
  const [prodPerPage] = useState(6)

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

  const indOfLast = currentPage * prodPerPage
  const indOfFirst = indOfLast - prodPerPage
  const currentProds = products.slice(indOfFirst, indOfLast)
  const paginator = (page) => setCurrentPage(page)

  //if searching return the filtered products
  if (search)
    return (
      <div>
        <h2>
          searching for {search} ({displayProducts.length})
        </h2>
        <ul className="productCards">
          {displayProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ul>
      </div>
    )

  //if not searching return all products
  return (
    <div>
      <div id='allProdsBanner'>
        <h1 id='allProdsH'>All Products</h1>
      </div>
      <div>
        <Paginate prodPerPage={prodPerPage} totalProds={products.length} paginator={paginator}/>
        <ul className='productCards'>
          {currentProds && currentProds.map(currentProd => 
            <ProductCard product={currentProd} key={currentProd.id}/>
          )}
        </ul>
        <hr />
        <p id="signature">© 2020, Craft Beer and Wine</p>
      </div>
    </div> 
  )
}

const mapStateToProps = ({products}) => ({products})

export default connect(mapStateToProps, null)(Products)
