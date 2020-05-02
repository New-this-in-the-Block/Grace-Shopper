'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Category} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  //create 5 categories
  const categories = ['IPA', 'Lager', 'Stout', 'Pinot', 'Merlot']
  const [ipa, lager, stout, pinot, merlot] = await Promise.all([
    Promise.all(categories.map(name => Category.create({name})))
  ])

  const [ipa01, ipa02, ipa03, wine01, wine02, wine03] = await Promise.all([
    Product.create({
      name: 'Missile IPA',
      ędescription:
        'An American India Pale Ale with firm bitterness and intense citrusy hop aromas. Made with two-row pale ale malt and dry hopped with simcoe, cascade, summit, and more for the full experience of an American IPAe',
      price: 4,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/missile-ipa-349069_1024x1024@2x.jpg?v=1582526620'
    }),
    Product.create({
      name: 'Wheeze the Juice IPA',
      description:
        'A juicy IPA dry-hopped for maximum flavor with mandarina bavaria, el dorado, and cascade hops.',
      price: 4,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/wheeze-the-juice-ipa-961699_1024x1024@2x.jpg?v=1588227282'
    }),
    Product.create({
      name: 'Tiny Juicy IPA',
      description:
        'A hazy session IPA brewed with copious amounts of ﬂaked oats. Hopped with Mosaic, Simcoe and Cascade for a fruity and piney ﬂavor that is cleaned up with a punch of bitterness. Tons of hop character in a small package–super drinkable and great for the season.',
      price: 3,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/tiny-juicy-ipa-112742_1024x1024@2x.jpg?v=1587402353'
    }),
    Product.create({
      name: 'Josh Cellars Cabernet Sauvignon 2017',
      description:
        'Round and juicy, this Cabernet Sauvignon has flavors of blackberry, toasted hazelnut and cinnamon, complemented by hints of vanilla and toasted oak.',
      price: 14.99,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h24/h66/8812378423326.png'
    }),
    Product.create({
      name: 'Decoy Sonoma Cabernet Sauvignon 2017',
      description:
        'From its deep, inviting color to its enticing layers of boysenberry, blackberry, plum and star anise, this wine showcases what we love about great Sonoma County Cabernet Sauvignon. On the palate, the lush fruit flavors are framed by rich tannins and hints of dark chocolate and barrel spice.',
      price: 19.99,
      quantity: 50,
      imageURL: 'https://images.heb.com/is/image/HEBGrocery/002210067'
    }),
    Product.create({
      name: 'Stags Leap Winery Napa Valley Cabernet Sauvignon 2016',
      description:
        'The 2016 Napa Valley Cabernet Sauvignon is plush and inviting, with an enticing array of brambly blackberry fruit along with raspberry sorbet notes alongside nuances of lifted violet, allspice, sweet cinnamon, clove, cedar and crushed bay leaves.',
      price: 49.99,
      quantity: 50,
      imageURL:
        'https://www.stagsleap.com/-/media/Images/StagsLeap/Bottle-Shots/SLW-2016-Napa-Valley-CabSauv-750.ashx?la=en&modified=20190107222619&mw=1382&hash=F2B8739735BF4ACB0BFE99F895C8E6C441673192'
    })
  ])
  // cant get this to work because i guess i still dont really understand promises
  // ipa01.categoryId = ipa

  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
