const Sequelize = require('sequelize')
const {UUID, UUIDV4, ENUM} = Sequelize
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Order = db.define('order', {
  id: uuidDef,
  status: {
    type: ENUM('Cart', 'Invoice')
  }
})

module.exports = Order
