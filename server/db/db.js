const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const {UUID, UUIDV4, STRING, INTEGER, DECIMAL, TEXT} = Sequelize
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: true
  }
)

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
//product must belong to at least one category
//If there is no photo, there must be a placeholder photo used

const Category = db.define('category', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

const User = db.define('user', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  //valid email, must contain '@'?
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

// Orders must belong to a user OR
// guest session (authenticated vs unauthenticated)
// Orders must contain line items that capture the price,
// current product ID and quantity
// If a user completes an order, that order should keep the price
// of the item at the time when they checked out even if the
// price of the product later changes

// const Order = db.define('order', {

// })

//review belong to a product
//belong to a user
//must have a minimum length
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

Review.belongsTo(User)
Review.belongsTo(Product)
User.hasMany(Product)
Product.hasMany(Review)
Product.belongsTo(Category)

// const sync = async () => {
//   await db.sync({ force: true })
//   //this user would be basic user---Unauthenticated
//   const []
// }

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
