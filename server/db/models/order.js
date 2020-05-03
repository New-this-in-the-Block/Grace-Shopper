const Sequelize = require('sequelize')
const {ENUM} = Sequelize
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: ENUM('Cart', 'Invoice')
  }
})

module.exports = Order
