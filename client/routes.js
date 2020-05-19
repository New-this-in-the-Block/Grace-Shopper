import React, {Component, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Products,
  ProductDetails,
  ProdForm,
  Categories,
  Profile,
  AdminProdList,
  AdminProfile,
  Cart,
  SplashPage
} from './components'
import {thunkLoadProducts, thunkLoadCategories, thunkLoadUsers, thunkLoadMyCart, thunkLoadMyOrders} from './store/thunks'
import {me} from './store'

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    if (localStorage.getItem('cart')) this.props.LoadMyCart(localStorage.getItem('cart'))
  }

  componentDidUpdate (prevProps) {
    if (prevProps !== this.props) {
      if (this.props.user.id) this.props.LoadMyOrders(this.props.user.id)
      else if (localStorage.getItem('cart')) this.props.LoadMyCart(localStorage.getItem('cart'))
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/" component={SplashPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/test" component={ProdForm} />
        <Route path="/test2" component={AdminProdList} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route path="/products/page/:id" component={Products} />
        <Route path="/products/categories/:id" component={Categories} />
        <Route path="/products" component={Products} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" render={({location}) => <AdminProfile path={location.pathname} />}/>
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route exact component={Login} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(thunkLoadUsers())
      dispatch(thunkLoadCategories())
      dispatch(thunkLoadProducts())
    },
    LoadMyOrders(id) {
      dispatch(thunkLoadMyOrders(id))
    },
    LoadMyCart(id) {
      dispatch(thunkLoadMyCart(id))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}