import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const UserHome = props => {
  const {email, biggestSeller, random, ranCat, ranPerCat} = props
 
  return (
    biggestSeller.name ? 
    <div>
      <div>
        <h3>Welcome, {email}</h3>
        <br/>
        <div className="splashContainer">                
                 <div>
                    <h4 >Best Seller</h4>
                    <Link to={`/products/${biggestSeller.id}`}>
                        <img src={biggestSeller.imageURL} className='splashProductsURL'/>
                    </Link>
                    <h5>{biggestSeller.name}</h5>
                    <h6>${biggestSeller.price}</h6>
                 </div>

                 <div>
                     <h4 >..Or Try Something New</h4>
                    <Link to={`/products/${random.id}`}>
                        <img src={random.imageURL} className='splashProductsURL'/>
                    </Link>
                     <h5>{random.name}</h5>
                    <h6>${random.price}</h6>
                 </div>

                 <div>
                     <h4 style={{color: "red"}}>Sale on {ranCat.name}'s - 10% off!</h4>
                    <Link to={`/products/${ranPerCat.id}`}>
                        <img src={ranPerCat.imageURL} className='splashProductsURL'/>
                    </Link>
                     <h5>{ranPerCat.name}</h5>
                    <h6>Price: ${ranPerCat.price}</h6>
                 </div>
            </div>
            <div className="splashButton">
                <button type='button'><Link to='/products/page/:id'>All Products</Link></button>
            </div>
      </div>
    </div> : <span>still loading..</span>
  )
}

const mapState = ({products, categories, user}) => {
  const biggestSeller = products.reduce((acc, product)=> {
    acc = acc.quantity < product.quantity ? acc : product
    return acc
  }, {})
  function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
  }
  const random = products[getRandomInt(19)]
  const ranCat = categories[getRandomInt(5)]
  const saleProducts = products.filter(pro => pro.categoryId === ranCat.id)
  const ranPerCat = saleProducts[getRandomInt(saleProducts.length-1)]
  return {
      biggestSeller,
      random,
      ranCat,
      ranPerCat,
      email: user.email

  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
