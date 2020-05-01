const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4} = Sequelize
const db = require('../db')

const Category = db.define('category', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Category
