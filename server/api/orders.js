const router = require('express').Router()
const {Order} = require('../db/models')
const {LineItem} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

//get all orders
router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next)
})

//get one specific order
router.get('/:id', (req, res, next) => {
  Order.findByPk(req.params.id)
    .then(order => res.send(order))
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
