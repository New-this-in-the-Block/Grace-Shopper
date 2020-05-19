import axios from 'axios'
import {
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
} from './actions'
  

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
    const currentProduct = (await axios.put(`/api/products/${product.id}`, product)).data
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
const thunkUpdateOrderStatus = order => async dispatch => {
    const currentOrder = (await axios.put(`/api/orders/user/${order.id}`, order)).data
    dispatch(actionUpdateOrderStatus(currentOrder))
}
const thunkLoadUsers = () => async(dispatch) => {
    const users = (await axios.get('/api/users')).data
    return dispatch(actionLoadUsers(users))
}
const thunkRemoveUser = id => async dispatch => {
    await axios.delete(`/api/users/${id}`)
    dispatch(actionRemoveUser(id))
}
const thunkLoadMyCart = id => async dispatch => {
    const cart = (await axios.get(`/api/orders/cart/${id}`)).data
    return dispatch(actionLoadCart(cart))
}
const thunkCreateOrder = (quantity, product, user) => async dispatch => {
    const order = (await axios.post('/api/orders', {quantity, productId: product.id, userId: user.id})).data
    return dispatch(actionCreateOrder(order))
}
const thunkAddToOrder = (quantity, product, cartId) => async dispatch => {
    const lineItem = (await axios.post('/api/lineItems', {quantity: quantity, productId: product.id, orderId: cartId})).data
    return dispatch(actionAddToOrder(lineItem))
}
const thunkRemoveFromOrder = (id) => async dispatch => {
    await axios.delete(`/api/lineItems/${id}`)
    return dispatch(actionRemoveFromOrder(id))
}
const thunkUpdateOrder = (quantity, id) => async dispatch => {
    const lineItem = (await axios.put('/api/lineItems', {quantity, id})).data
    return dispatch(actionUpdateOrder(lineItem))
}


export {
    thunkLoadProducts,
    thunkCreateProduct,
    thunkRemoveProduct,
    thunkUpdateProduct,
    thunkLoadCategories,
    thunkLoadAllOrders,
    thunkLoadMyOrders,   
    thunkUpdateOrderStatus,
    thunkLoadUsers,
    thunkRemoveUser,
    thunkLoadMyCart,
    thunkCreateOrder,  
    thunkAddToOrder,
    thunkRemoveFromOrder,
    thunkUpdateOrder
}