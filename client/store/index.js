import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import axios from 'axios'

//Constants
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

//Action Creators
const actionLoadProducts = products => ({type: LOAD_PRODUCTS, products})

//Thunks
const thunkLoadProducts = () => async dispatch => {
  const products = (await axios.get('/api/products')).data
  dispatch(actionLoadProducts(products))
}

const reducer = combineReducers({user})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

export {thunkLoadProducts}
