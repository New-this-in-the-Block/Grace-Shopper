const router = require('express').Router()
const {Order, Product, LineItem} = require('../db/models')
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
  const existing = await LineItem.findOne({where: {productId: req.body.productId, orderId: req.body.orderId}})
  if (existing) await existing.update({quantity: existing.quantity*1 + req.body.quantity*1})
  else await LineItem.create(req.body)
  const cart = await Order.findOne(
    {where: {id: req.body.orderId},
    include: [
      {model: LineItem, include: [{model: Product}]
    }
    ]
  })
  res.status(201).send(cart)
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteItem = await LineItem.findByPk(req.params.id)
    await deleteItem.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/', async(req, res, next) => {
  const lineItem = await LineItem.findByPk(req.body.id)
  await lineItem.update({
        quantity: req.body.quantity
      })
  const cart = await Order.findOne(
    {where: {id: lineItem.orderId},
    include: [
      {model: LineItem, include: [{model: Product}]
    }
    ]
  })
  await res.status(201).send(cart)
})
