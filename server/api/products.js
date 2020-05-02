const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/products', (req, res, next) => {
  Product.findAll()
    .then(product => res.send(product))
    .catch(next)
})

router.get('/products/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(thisProduct => res.send(thisProduct))
    .catch(next)
})

router.post('/products', (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => res.status(201).send(newProduct))
    .catch(next)
})

router.put('/products/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(thisProduct =>
      thisProduct.update({
        price: req.body.price,
        quantity: req.body.quantity
      })
    )
    .then(updatedProduct => res.send(updatedProduct))
    .catch(next)
})

router.delete('/products/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(thisProduct => thisProduct.delete())
    .then(() => res.sendStatus(204))
    .catch(next)
})
