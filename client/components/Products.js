import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import Paginate from './Paginate'
import BottomNav from './BottomNav'
import {compareNames, comparePrices} from '../../script/utils'
import {DropdownButton, Dropdown} from 'react-bootstrap'

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
  

  if(!displayProducts[0]) return null
  function nameSortAsc() {
    setDisplayProducts(products.slice().sort(compareNames('name')))
  }
  function nameSortDes() {
    setDisplayProducts(products.slice().sort(compareNames('name', 'descending')))
  }
  function priceSortAsc() {
    setDisplayProducts(products.slice().sort(comparePrices('price')))
  }
  function priceSortDes() {
    setDisplayProducts(products.slice().sort(comparePrices('price', 'descending')))
  }
  const indOfLast = currentPage * prodPerPage
  const indOfFirst = indOfLast - prodPerPage
  const currentProds = displayProducts.slice(indOfFirst, indOfLast)
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
        <div>
          <DropdownButton id="dropdown-basic-button" title="Sort By: Name/Price">
            <Dropdown.Item onClick={nameSortAsc}>Name: A - Z</Dropdown.Item>
            <Dropdown.Item onClick={nameSortDes}>Name: Z - A</Dropdown.Item>
            <Dropdown.Item onClick={priceSortAsc}>Price: Low - High</Dropdown.Item>
            <Dropdown.Item onClick={priceSortDes}>Price: High - Low</Dropdown.Item>
          </DropdownButton>
        </div>
        <Paginate prodPerPage={prodPerPage} totalProds={products.length} paginator={paginator} currentPage={currentPage}/>
        <ul className='productCards'>
          {currentProds && currentProds.map(currentProd => 
            <ProductCard product={currentProd} key={currentProd.id}/>
          )}
        </ul>
        <Paginate prodPerPage={prodPerPage} totalProds={products.length} paginator={paginator} currentPage={currentPage}/>
        <BottomNav />
      </div>
    </div> 
  )
}

const mapState = ({products}) => ({products})

export default connect(mapState)(Products)
