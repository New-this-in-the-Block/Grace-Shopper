const Sequelize = require('sequelize')
const {UUID, UUIDV4, STRING, INTEGER, DECIMAL, TEXT} = Sequelize
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Product = db.define('product', {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  id: uuidDef,
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: STRING,
    defaultValue: ''
  }
})

module.exports = Product
