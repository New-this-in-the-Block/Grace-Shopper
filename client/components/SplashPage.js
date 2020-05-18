import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import {getRandomInt, biggestSeller} from '../../script/utils'


const SplashPage = ({biggestSeller2, random, ranCat, ranPerCat}) => {
    const [show, setShow] = useState(true)
//   constructor() {
//     super()
//     this.state = {
//       show: true
//     }
//     this.handleClose = this.handleClose.bind(this)
//   }

//   handleClose() {
//     this.setState({show: false})
//   }
    function handleClose() {
        setShow(false)
    }
    return (
    biggestSeller2.name ? 
        <div id="splashdiv">
            <div className="splashpic">
                <div>
                    <Modal show={show}>
                        <Modal.Header>
                        <Modal.Title>Age Verification</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        This site sells age restricted products. Are you atleast 21 years
                        old?
                        </Modal.Body>
                        <Modal.Footer>
                        <button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            I wish I was 21 again.
                        </button>
                        <button type="button">
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.amazon.com/Tropicana-Orange-Juice-Ounce-Pack/dp/B001AQTUK4/ref=sr_1_1_sspa?crid=39RBYM3UTDV55&dchild=1&keywords=orange+juice&qid=1589126976&sprefix=oran%2Caps%2C151&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzMjdSMFBKQUtETVpJJmVuY3J5cHRlZElkPUEwOTQwMDM4MjQ1VjdISkVRRVlZViZlbmNyeXB0ZWRBZElkPUEwNjI0OTIwM1RDTVk0WTg2SDJPMSZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU="
                            >
                            Not yet
                            </a>
                        </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="splashContainer">                
                    <div>
                    <h4 >Best Seller</h4>
                    <Link to={`/products/${biggestSeller2.id}`}>
                        <img src={biggestSeller2.imageURL} className='splashProductsURL'/>
                    </Link>
                    <h5>{biggestSeller2.name}</h5>
                    <h6>${biggestSeller2.price}</h6>
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
            <hr />
            <p id="signature">© 2020, Craft Beer and Wine</p>
        </div>
        : <span>Still Loading...</span>
    )
}


const mapState = ({products, categories}) => {
    const biggestSeller2 = biggestSeller(products) 
    const random = products[getRandomInt(19)]
    const ranCat = categories[getRandomInt(5)] ? categories[getRandomInt(5)] : categories[0]
    const saleProducts = products.filter(pro => pro.categoryId === ranCat.id)
    const ranPerCat = saleProducts[getRandomInt(saleProducts.length-1)]
    return {
        biggestSeller2,
        random,
        ranCat,
        ranPerCat
    }
}

export default connect(mapState)(SplashPage)
