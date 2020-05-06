const router = require('express').Router()
const {Order} = require('../db/models')
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

//get all the orders for a user
router.get('/user/:id', (req, res, next) => {
  Order.findAll({where: {userId: req.params.orderId}})
    .then(orders => res.send(orders))
    .catch(next)
})
