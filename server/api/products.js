const router = require('express').Router()
const {Product} = require('../db/db')
module.exports = router

router.get('/product', (req, res, next) => {
  Product.findAll()
    .then(product => res.send(product))
    .catch(next)
})
