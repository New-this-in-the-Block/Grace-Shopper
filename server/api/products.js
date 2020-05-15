const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  Product.findAll({include: [Category]})
    .then(product => res.send(product))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(thisProduct => res.send(thisProduct))
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
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        categoryId: req.body.categoryId
      })
    )
    .then(updatedProduct => res.send(updatedProduct))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(thisProduct => thisProduct.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})
