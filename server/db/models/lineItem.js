const Sequelize = require('sequelize')
const {UUID, UUIDV4, INTEGER} = Sequelize
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const LineItem = db.define('lineItem', {
  id: uuidDef,
  quantity: {
    type: INTEGER
  }
})

module.exports = LineItem
