const router = require('express').Router()
const {Order} = require('../db/models')
const {LineItem} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router


//get all orders - ADMIN ONLY
// router.get('/', (req, res, next) => {
//   Order.findAll()
//     .then(orders => res.send(orders))
//     .catch(next)
// })
router.get('/', async(req, res, next) => {
  try {
    res.send(await Order.findAll())
  } catch (error) {
    next(error)
  }
})

//create a cart with the initial item
router.post('/', async (req, res, next) => {
  const order = await Order.create({status: 'Cart', userId: req.body.userId})
  const lineItem = await LineItem.create({quantity: 1, productId: req.body.productId, orderId: order.id})
  const cart = await Order.findOne(
    {where: {id: order.id},
    include: [
      {model: LineItem, include: [{model: Product}]
    }
    ]
  })
  await res.status(201).send(cart)
})


//get the cart - if no cart, create one - only works for users atm
router.get('/cart/:id', (req, res, next) => {
  Order.findOne(
    {where: {userId: req.params.id, status: 'Cart'},
    include: [{model: LineItem}]
  })
  .then( cart => {
    if (cart) return cart
    else return Order.create({userId: req.params.id, status: 'Cart'})
  })
  .then( cart => res.status(201).send(cart))
  .catch(next)
})

//get all the orders for a user with the lineitems and products attached
router.get('/user/:id', (req, res, next) => {
  Order.findAll({
    where: {userId: req.params.id},
    include: [
      {
        model: LineItem,
        include: [{model: Product}]
      }
    ]
  })
    .then(processed => res.send(processed))
    .catch(next)
})

router.put('/user/:id', (req, res, next) => {
  // console.log('LOOOK HEREEEEE',req)
  Order.findByPk(req.params.id)
    .then(order => 
      order.update({
        status: req.body.status
      }))
    .then(updatedOrder => res.send(updatedOrder))
    .catch(next)
})