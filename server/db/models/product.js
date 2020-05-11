const Sequelize = require('sequelize')
const {UUID, UUIDV4, STRING, INTEGER, DECIMAL, TEXT, ENUM} = Sequelize
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Product = db.define('product', {
  id: uuidDef,
  alcohol: {
    type: ENUM ('Beer', 'Wine')
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
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
