const router = require('express').Router()
const {Product, Category, User} = require('../db/models')

module.exports = router

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next()
  else res.status(401).send('Not Authorized: you need admin authorization')
}

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

router.post('/', isAdmin, async (req, res, next) => {
  try {
      const product = await Product.create(req.body)
      res.send(product)
  } catch (error) {
    next(error)
  }
})


router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
      const product = await Product.findByPk(req.params.id)
      await product.destroy()
      res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAdmin, (req, res, next) => {
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

