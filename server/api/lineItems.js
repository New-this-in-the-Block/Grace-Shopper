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

//add to an order
router.post('/', (req, res, next) => {
  console.log(req.body)
  LineItem.create(req.body)
})

router.put('/:id', (req, res, next) => {
  LineItem.findByPk(req.params.id)
    .then(thisProduct =>
      thisProduct.update({
        quantity: req.body.quantity
      })
    )
})
