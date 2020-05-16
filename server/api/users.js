const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next()
  else res.status(401).send('Not Authorized: you need admin authorization')
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})



router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})