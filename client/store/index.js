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
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

const LOAD_ORDERS = 'LOAD_ORDERS'

const LOAD_USERS = 'LOAD_USERS'
const REMOVE_USER = 'REMOVE_USER'


//Action Creators
const actionLoadProducts = products => ({type: LOAD_PRODUCTS, products})
const actionCreateProduct = product => ({type: CREATE_PRODUCT, product})
const actionUpdateProduct = product => ({type: UPDATE_PRODUCT, product})
const actionRemoveProduct = id => ({type: REMOVE_PRODUCT, id})

const actionLoadCategories = categories => ({type: LOAD_CATEGORIES, categories})

const actionLoadOrders = orders => ({type: LOAD_ORDERS, orders})

const actionLoadUsers = users => ({type: LOAD_USERS, users})
const actionRemoveUser = id => ({type: REMOVE_USER, id})

//Thunks
const thunkLoadProducts = () => async dispatch => {
  const products = (await axios.get('/api/products')).data
  return dispatch(actionLoadProducts(products))
}
const thunkCreateProduct = product => async dispatch => {
  const newProduct = (await axios.post('/api/products', product)).data
  dispatch(actionCreateProduct(newProduct))
}
const thunkRemoveProduct = id => async dispatch => {
  await axios.delete(`/api/products/${id}`)
  dispatch(actionRemoveProduct(id))
}
const thunkUpdateProduct = product => async dispatch => {
  const currentProduct = (await axios.put(
    `/api/products/${product.id}`,
    product
  )).data
  dispatch(actionUpdateProduct(currentProduct))
}

const thunkLoadCategories = () => async dispatch => {
  const categories = (await axios.get('/api/categories')).data
  return dispatch(actionLoadCategories(categories))
}

const thunkLoadAllOrders = () => async dispatch => {
  const orders = (await axios.get('/api/orders')).data
  return dispatch(actionLoadOrders(orders))
}

const thunkLoadMyOrders = id => async dispatch => {
  const orders = (await axios.get(`/api/orders/user/${id}`)).data
  return dispatch(actionLoadOrders(orders))
}

const thunkLoadUsers = () => {
  return async(dispatch) => {
    const users = (await axios.get('/api/users')).data
    return dispatch(actionLoadUsers(users))
  }
}
const thunkRemoveUser = id => async dispatch => {
  await axios.delete(`/api/users/${id}`)
  dispatch(actionRemoveUser(id))
}

//Reducers
const productReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.id)
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

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders
    default:
      return state
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users
    case REMOVE_USER:
      return state.filter(user => user.id !== action.id)
    default: 
      return state
  }
}

const reducer = combineReducers({
  user,
  products: productReducer,
  categories: categoryReducer,
  orders: orderReducer,
  allUsers: usersReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

export {
  thunkLoadProducts,
  thunkCreateProduct,
  thunkUpdateProduct,
  thunkRemoveProduct,
  thunkLoadCategories,
  thunkLoadAllOrders,
  thunkLoadMyOrders,
  thunkLoadUsers,
  thunkRemoveUser
}
