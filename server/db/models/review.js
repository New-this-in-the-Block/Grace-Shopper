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
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
