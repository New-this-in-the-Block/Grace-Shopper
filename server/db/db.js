const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: true
  }
)

//product must belong to at least one category
//If there is no photo, there must be a placeholder photo used

// Orders must belong to a user OR
// guest session (authenticated vs unauthenticated)
// Orders must contain line items that capture the price,
// current product ID and quantity
// If a user completes an order, that order should keep the price
// of the item at the time when they checked out even if the
// price of the product later changes

// const Order = db.define('order', {

//review belong to a product
//belong to a user
//must have a minimum length

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
