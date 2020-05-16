const router = require('express').Router()
const {Order, LineItem, Product} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next()
  else res.send("nope")
}

//get all orders - ADMIN ONLY
router.get('/', isAdmin, (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next)
})

//create a cart with the initial item
router.post('/', async (req, res, next) => {
  const order = await Order.create({status: 'Cart', userId: req.body.userId})
  await LineItem.create({quantity: req.body.quantity, productId: req.body.productId, orderId: order.id})
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
