import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import axios from 'axios'

//Constants
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//Action Creators
const actionLoadProducts = products => ({type: LOAD_PRODUCTS, products})
const actionCreateProduct = product => ({type: CREATE_PRODUCT, product})
const actionUpdateProduct = product => ({type: UPDATE_PRODUCT, product})

//Thunks
const thunkLoadProducts = () => async dispatch => {
  const products = (await axios.get('/api/products')).data
  return dispatch(actionLoadProducts(products))
}
const thunkCreateProduct = product => async dispatch => {
  const newProduct = (await axios.post('/api/products', product)).data
  dispatch(actionCreateProduct(newProduct))
}
const thunkUpdateProduct = product => async dispatch => {
  const currentProduct = (await axios.put(
    `/api/products/${product.id}`,
    product
  )).data
  dispatch(actionUpdateProduct(currentProduct))
}

//Reducers
const productReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    case UPDATE_PRODUCT:
      return state.map(product => {
        if (product.id === action.product.id) {
          return action.product
        } else {
          return product
        }
      })
    default:
      return state
  }
}
const reducer = combineReducers({
  user,
  products: productReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

export {thunkLoadProducts, thunkCreateProduct, thunkUpdateProduct}
