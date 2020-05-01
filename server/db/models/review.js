const Sequelize = require('sequelize')
const {INTEGER, TEXT} = Sequelize
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: TEXT,
    allowNull: false,
    len: {
      args: [20] //this should be min characters
    }
  },
  rating: {
    type: INTEGER,
    validate: {
      min: 0,
      max: 5,
      defaultValue: 0
    }
  }
})

module.exports = Review
