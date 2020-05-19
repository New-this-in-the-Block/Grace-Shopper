import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {
  LOAD_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT,
  LOAD_CATEGORIES,
  LOAD_ORDERS,
  LOAD_CART,
  UPDATE_ORDER,
  CREATE_ORDER,
  ADD_TO_ORDER,
  REMOVE_FROM_ORDER,
  UPDATE_ORDER_STATUS,
  LOAD_USERS,
  REMOVE_USER
} from './constants'


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

// eslint-disable-next-line complexity
const orderReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders
    case LOAD_CART:
      return [action.cart]
    case CREATE_ORDER:
      return [...state, action.order]
    case UPDATE_ORDER_STATUS:
      return state.map(order => {
        if (order.id === action.order.id) {
          return action.order
        } else {
          return order
        }
      }) 
    case ADD_TO_ORDER:
      return state.map(order => {
        if (order.id === action.order.id) {
          return action.order
        }else {
          return order
        }
      })
      case REMOVE_FROM_ORDER:
        return state.map(order => {
          if (order.status === 'Cart') {
            order.lineItems = order.lineItems.filter( item => item.id !== action.id)
            return order
          }else {
            return order
          }
        })
    case UPDATE_ORDER:
      return state.map(order => {
        if (order.id === action.order.id) {
          return action.order
        }else {
          return order
        }
      })
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

