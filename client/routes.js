import React, {Component} from 'react'
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
<<<<<<< HEAD
  AdminProfile,
  Cart
=======
  SplashPage
>>>>>>> home_page
} from './components'
import {me, thunkLoadProducts, thunkLoadCategories} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
<<<<<<< HEAD
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/products/categories/:id" component={Categories} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route
          path="/admin"
          render={({location}) => <AdminProfile path={location.pathname} />}
        />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route exact component={Login} />
      </Switch>
=======
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={SplashPage} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/products" component={Products} />
          <Route path="/test" component={ProdForm} />
          <Route path="/test2" component={AdminProdList} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route path="/products/categories/:id" component={Categories} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route exact component={Login} />
        </Switch>
      </div>
>>>>>>> home_page
    )
  }
}

const mapState = state => {
  // console.log(state.products)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(thunkLoadCategories())
      dispatch(thunkLoadProducts())
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
