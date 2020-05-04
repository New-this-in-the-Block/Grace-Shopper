const Sequelize = require('sequelize')
const {INTEGER} = Sequelize
const db = require('../db')

const LineItem = db.define('lineItem', {
  quantity: {
    type: INTEGER,
    validate: {
      defaultValue: 0
    }
  }
})

module.exports = LineItem
