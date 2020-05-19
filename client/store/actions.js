import {
    LOAD_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    REMOVE_PRODUCT,
    LOAD_CATEGORIES,
    LOAD_ORDERS,
    CLEAR_ORDERS,
    LOAD_CART,
    UPDATE_ORDER,
    CREATE_ORDER,
    ADD_TO_ORDER,
    REMOVE_FROM_ORDER,
    UPDATE_ORDER_STATUS,
    LOAD_USERS,
    REMOVE_USER
  } from './constants'

const actionLoadProducts = products => ({type: LOAD_PRODUCTS, products})
const actionCreateProduct = product => ({type: CREATE_PRODUCT, product})
const actionUpdateProduct = product => ({type: UPDATE_PRODUCT, product})
const actionRemoveProduct = id => ({type: REMOVE_PRODUCT, id})

const actionLoadCategories = categories => ({type: LOAD_CATEGORIES, categories})

const actionLoadOrders = orders => ({type: LOAD_ORDERS, orders})
const actionLoadCart = cart => ({type: LOAD_CART, cart})
const actionCreateOrder = order => ({type: CREATE_ORDER, order})
const actionAddToOrder = order => ({type: ADD_TO_ORDER, order})
const actionClearOrders = _ => ({type: CLEAR_ORDERS})

const actionRemoveFromOrder = id => ({type: REMOVE_FROM_ORDER, id})
const actionUpdateOrder = order => ({type: UPDATE_ORDER, order})
const actionUpdateOrderStatus = order => ({type: UPDATE_ORDER_STATUS, order})

const actionLoadUsers = users => ({type: LOAD_USERS, users})
const actionRemoveUser = id => ({type: REMOVE_USER, id})

export {
    actionLoadProducts,
    actionCreateProduct,
    actionUpdateProduct,
    actionRemoveProduct,
    actionLoadCategories,
    actionLoadOrders,
    actionClearOrders,
    actionLoadCart,
    actionCreateOrder,
    actionAddToOrder,
    actionRemoveFromOrder,
    actionUpdateOrder,
    actionUpdateOrderStatus,
    actionLoadUsers,
    actionRemoveUser
}