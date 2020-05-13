const router = require('express').Router()
const {Order} = require('../db/models')
const {LineItem} = require('../db/models')
const {Product} = require('../db/models')
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

//add to an order
router.post('/', async(req, res, next) => {
  const lineItem = await LineItem.create(req.body)
  const cart = await Order.findOne(
    {where: {id: lineItem.orderId},
    include: [
      {model: LineItem, include: [{model: Product}]
    }
    ]
  })
  await res.status(201).send(cart)
})

router.put('/:id', (req, res, next) => {
  LineItem.findByPk(req.params.id)
    .then(thisProduct =>
      thisProduct.update({
        quantity: req.body.quantity
      })
    )
})
