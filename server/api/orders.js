const router = require('express').Router()
const {Order, LineItem, Product} = require('../db/models')
const stripe = require("stripe")('sk_test_NJ4FK76R31JmK0V9mLtp7eOE00yFjf8urJ')
module.exports = router


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

router.post('/cart', async (req, res) => {
  try {
    const {total, token} = req.body
    const customer = await stripe.customers.create({email: token.email, source: token.id})

    //so that customers arent charged twice
    // const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: Math.floor(total * 100),
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      }
    )
    console.log('Charge', {charge})
    status = 'success'
  } catch (error) {
    console.error('Error:', error)
    status = 'failure'
  } 
})