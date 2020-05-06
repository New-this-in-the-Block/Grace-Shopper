const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(product => res.send(product))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(thisProduct => res.send(thisProduct))
    .catch(next)
})

//tyring this out
router.get('/categories/:id', (req, res, next) => {
  Product.findAll({
    where: {
      categoryId: req.params.id
    }
  })
    .then(products => res.send(products))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => res.status(201).send(newProduct))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(thisProduct => thisProduct.delete())
    .then(() => res.sendStatus(204))
    .catch(next)
})
