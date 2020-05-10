import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Modal} from 'react-bootstrap'

class SplashPage extends Component {
  constructor() {
    super()
    this.state = {
      show: true
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({show: false})
  }

  render() {
    const {products} = this.props
    return (
      <div className="splashpic">
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
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
                onClick={this.handleClose}
              >
                Yes and I wish I was 21 again.
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
        <div className="bestSeller">
          Try our best-seller!
          {/* <ProductCard/> */}
        </div>
      </div>
    )
  }
}

const mapState = ({products, lineItems}) => {
  let count = 0
  let best = ''
  lineItems.forEach(item => {
    if (item.quantity > count) {
      count = item.quantity
      best = item.productId
    }
  })
  const mostPop = products.find(pro => pro.id === best)
  console.log('most', mostPop)

  return {
    mostPop
  }
}

export default connect(mapState, null)(SplashPage)
