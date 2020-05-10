const router = require('express').Router()
const {Order} = require('../db/models')
const {LineItem} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

//get all orders - ADMIN ONLY
router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next)
})

//create a cart - might not need this
router.post('/', (req, res, next) => {
  Order.create({status: 'Cart'})
  .then( cart => res.status(201).send(cart))
  .catch(next)
})


//get the cart - if no cart, create one - only works for users atm
router.get('/cart/:id', (req, res, next) => {
  Order.findOne({where: {userId: req.params.id, status: 'Cart'}})
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
