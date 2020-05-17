const router = require('express').Router()
const {Order, LineItem, Product} = require('../db/models')
const stripe = require("stripe")('sk_test_NJ4FK76R31JmK0V9mLtp7eOE00yFjf8urJ')
const nodemailer = require('nodemailer')

module.exports = router


router.get('/', async(req, res, next) => {
  try {
    res.send(await Order.findAll({
      include: [
        {
          model: LineItem,
          include: [{model: Product}]
        }
      ],
      order: [
        ['updatedAt', 'DESC']
    ]
    }))
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

//get all the orders for a user with the lineitems and products attached
router.get('/user/:id', (req, res, next) => {
  Order.findAll({
    where: {userId: req.params.id},
    include: [
      {
        model: LineItem,
        include: [{model: Product}]
      }
    ],
    order: [
      ['updatedAt', 'DESC']
  ]
  })
    .then(processed => res.send(processed))
    .catch(next)
})

router.put('/user/:id', (req, res, next) => {
  Order.findOne(
    {where: {id: req.params.id},
    include: [
      {model: LineItem, include: [{model: Product}]
    }
    ],
    order: [
      ['updatedAt', 'DESC']
  ]
  })
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
    status = 'success'
    await res.status(201)
  } catch (error) {
    console.error('Error:', error)
    status = 'failure'
  } 


//Nodemailer portion
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'newthisintheblock@gmail.com',
      pass: '2001-new-this-in-the-block' 
    }
  });
  
  const mailOptions = {
    from: 'newthisintheblock@gmail.com',
    to: req.body.token.email,
    subject: 'Stripe Payment Confirmation',
    text: `Thanks for shopping at Craft Beer and Wine, this is to confirm your payment of ${req.body.total}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
})
