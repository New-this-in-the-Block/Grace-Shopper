const crypto = require('crypto')
const Sequelize = require('sequelize')
const {UUID, UUIDV4, STRING, INTEGER, DECIMAL, TEXT} = Sequelize
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Category
