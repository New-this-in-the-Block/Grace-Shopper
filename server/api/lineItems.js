const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

//get all line items
router.get('/', (req, res, next) => {
  LineItem.findAll()
    .then(lineItems => res.send(lineItems))
    .catch(next)
})

//get one specific line item
router.get('/:id', (req, res, next) => {
  LineItem.findByPk(req.params.id)
    .then(lineItem => res.send(lineItem))
    .catch(next)
})

//get all the line items in an order
router.get('/order/:orderId', (req, res, next) => {
  LineItem.findAll({where: {orderId: req.params.orderId}})
    .then(lineItems => res.send(lineItems))
    .catch(next)
})
