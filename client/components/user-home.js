import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRandomInt, biggestSeller} from '../../script/utils'
import BottomNav from './BottomNav'


export const UserHome = props => {
  const {email, biggestSeller2, random, ranCat, ranPerCat} = props
 
  return (
    biggestSeller2.name ? 
    <div>
      <div>
        <h3 id='homeH'>Welcome, {email}</h3>
        <br/>
        <div className="splashContainer">                
                 <div className='homeCard'>
                    <h4 >Best Seller</h4>
                    <Link to={`/products/${biggestSeller2.id}`}>
                        <img src={biggestSeller2.imageURL} className='splashProductsURL'/>
                    </Link>
                    <h5>{biggestSeller2.name}</h5>
                    <h6>${biggestSeller2.price}</h6>
                 </div>

                 <div className='homeCard'>
                     <h4 >..Or Try Something New</h4>
                    <Link to={`/products/${random.id}`}>
                        <img src={random.imageURL} className='splashProductsURL'/>
                    </Link>
                     <h5>{random.name}</h5>
                    <h6>${random.price}</h6>
                 </div>

                 <div className='homeCard'>
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
      <BottomNav />
    </div> : <span>still loading..</span>
  )
}

const mapState = ({products, categories, user}) => {
  const biggestSeller2 = biggestSeller(products)
  const random = products[getRandomInt(19)]
  const ranCat = categories[getRandomInt(5)]
  const saleProducts = products.filter(pro => pro.categoryId === ranCat.id)
  const ranPerCat = saleProducts[getRandomInt(saleProducts.length-1)]
  return {
      biggestSeller2,
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
