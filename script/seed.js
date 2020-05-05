'use strict'
const db = require('../server/db')
const {User, Product, Category} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'mike@email.com', password: '123', isAdmin: true})
  ])

  //Categories
  const [ipa, lager, stout, pinot, cabernet, chardonnay] = await Promise.all([
    Category.create({name: 'IPA'}),
    Category.create({name: 'Lager'}),
    Category.create({name: 'Stout'}),
    Category.create({name: 'Pinot'}),
    Category.create({name: 'Cabernet'}),
    Category.create({name: 'Chardonnay'})
  ])

  //Products
  const [
    beer01,
    beer02,
    beer03,
    beer04,
    beer05,
    beer06,
    beer07,
    beer08,
    beer09,
    beer10,
    wine01,
    wine02,
    wine03,
    wine04,
    wine05,
    wine06,
    wine07,
    wine08,
    wine09,
    wine10
  ] = await Promise.all([
    //01
    Product.create({
      name: 'Missile IPA',
      description:
        'An American India Pale Ale with firm bitterness and intense citrusy hop aromas. Made with two-row pale ale malt and dry hopped with simcoe, cascade, summit, and more for the full experience of an American IPA.',
      price: 4,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/missile-ipa-349069_1024x1024@2x.jpg?v=1582526620',
      categoryId: ipa.id
    }),
    //02
    Product.create({
      name: 'Wheeze the Juice IPA',
      description:
        'A juicy IPA dry-hopped for maximum flavor with mandarina bavaria, el dorado, and cascade hops.',
      price: 4,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/wheeze-the-juice-ipa-961699_1024x1024@2x.jpg?v=1588227282',
      categoryId: lager.id
    }),
    //03
    Product.create({
      name: 'Tiny Juicy IPA',
      description:
        'A hazy session IPA brewed with copious amounts of ﬂaked oats. Hopped with Mosaic, Simcoe and Cascade for a fruity and piney ﬂavor that is cleaned up with a punch of bitterness. Tons of hop character in a small package–super drinkable and great for the season.',
      price: 3,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/tiny-juicy-ipa-112742_1024x1024@2x.jpg?v=1587402353',
      categoryId: ipa.id
    }),
    //04
    Product.create({
      name: 'East Coast Ghost',
      description: 'Dry hopped with flaked oats.',
      price: 4,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/east-coast-ghost-240119_1024x1024@2x.jpg?v=1585859402',
      categoryId: stout.id
    }),
    //05
    Product.create({
      name: 'Tune In, Space Øut',
      description:
        'New England-style IPA jam packed with Galaxy Hops. Fresh notes of juicy orange, muscat grape, and ruby red grapefruit.',
      price: 16,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/tune-in-space-out-652321_1024x1024@2x.jpg?v=1588227282',
      categoryId: lager.id
    }),
    //06
    Product.create({
      name: 'Young Dirty Brew',
      description:
        'Young Dirty Brew is a collaboration between Young Dirty Bastard, the son of the legendary hip-hop artist and member of the Wu-Tang Clan, Ol Dirty Bastard, and Circa Brewing Company based in Brooklyn, New York City. This honey ale is brewed with organic raw honey and explodes with a flavorful and subtle balance between the brightness of the crisp beer and the sweetness and earthiness obtained from the use of honey.',
      price: 5,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/young-dirty-brew-742397_1024x1024@2x.jpg?v=1583468616',
      categoryId: lager.id
    }),
    //07
    Product.create({
      name: 'Oberon Ale',
      description:
        'Bells Oberon is a wheat ale fermented with Bells signature house ale yeast, mixing a spicy hop character with mildly fruity aromas. The addition of wheat malt lends a smooth mouthfeel, making it a classic summer beer.',
      price: 16,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/oberon-ale-229637_1024x1024@2x.jpg?v=1582526613',
      categoryId: lager.id
    }),
    //08
    Product.create({
      name: 'On Fleek',
      description:
        'A 13 percent ABV imperial stout brewed with dark sugars and molasses.',
      price: 16,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/on-fleek-586769_1024x1024@2x.jpg?v=1582526627',
      categoryId: stout.id
    }),
    //09
    Product.create({
      name: 'More Gold Than the Man on the A-Team',
      description:
        'Imperial stout brewed in collaboration with Rob and Anthony from Transmitter Brewing. This is a malt bill built on English Marris Otter, with layers of roast wheat, chocolate malt, and three different crystal malts for a deep sweet Maillard character balanced with a hint of roast bitterness. Fermented with a Belgian strain, which produced fruit-filled ester aromatic notes. Then aged in Woodford double oak barrels for 12 months for added oak and vanilla character.',
      price: 16,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/more-gold-than-the-man-on-the-a-team-624626_1024x1024@2x.jpg?v=1587312048',
      categoryId: ipa.id
    }),
    //10
    Product.create({
      name: 'McDoogles Nitro Irish Stout',
      description:
        'McDoogles will bring you right back to your favorite pub, sitting at the bar having your favorite stout. This brew is big and bold, yet smooth and creamy.',
      price: 16,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/mcdoogles-nitro-irish-stout-435016_1024x1024@2x.jpg?v=1588445533',
      categoryId: stout.id
    }),
    //01
    Product.create({
      name: 'Josh Cellars Cabernet Sauvignon',
      description:
        'Round and juicy, this Cabernet Sauvignon has flavors of blackberry, toasted hazelnut and cinnamon, complemented by hints of vanilla and toasted oak.',
      price: 14.99,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h24/h66/8812378423326.png',
      categoryId: pinot.id
    }),
    //02
    Product.create({
      name: 'Decoy Sonoma Cabernet Sauvignon',
      description:
        'From its deep, inviting color to its enticing layers of boysenberry, blackberry, plum and star anise, this wine showcases what we love about great Sonoma County Cabernet Sauvignon. On the palate, the lush fruit flavors are framed by rich tannins and hints of dark chocolate and barrel spice.',
      price: 19.99,
      quantity: 50,
      imageURL: 'https://images.heb.com/is/image/HEBGrocery/002210067',
      categoryId: cabernet.id
    }),
    //03
    Product.create({
      name: 'Stags Leap Winery Napa Valley Cabernet Sauvignon',
      description:
        'The 2016 Napa Valley Cabernet Sauvignon is plush and inviting, with an enticing array of brambly blackberry fruit along with raspberry sorbet notes alongside nuances of lifted violet, allspice, sweet cinnamon, clove, cedar and crushed bay leaves.',
      price: 49.99,
      quantity: 50,
      imageURL:
        'https://www.stagsleap.com/-/media/Images/StagsLeap/Bottle-Shots/SLW-2016-Napa-Valley-CabSauv-750.ashx?la=en&modified=20190107222619&mw=1382&hash=F2B8739735BF4ACB0BFE99F895C8E6C441673192',
      categoryId: cabernet.id
    }),
    //04
    Product.create({
      name: 'Cloud Break Chardonnay',
      description:
        'The Cloud Break Chardonnay is rich with flavors of toasted oak, vanilla, butter, apple, pear and hints of coconut. Refined acidity and hints of green apple linger on the elegant finish. Excellent with grilled pork chops.',
      price: 8.99,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/ha7/h1f/11675609989150.png',
      categoryId: chardonnay.id
    }),
    //05
    Product.create({
      name: 'Meiomi Pinot Noir',
      description:
        'This beautiful Pinot Noir carries aromas of tobacco, dark red fruits and fresh berries. The rich cherry flavor is complemented by notes of cedar, raspberry and strawberry. Enjoy with turkey, salmon or beef dishes.',
      price: 19.97,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h04/h2e/12336197042206.png',
      categoryId: pinot.id
    }),
    //06
    Product.create({
      name: 'Domaine Loubejac Pinot Noir',
      description:
        'Willamette Valley, OR- Reminiscent of a French wine, this Pinot Noir has aromas and flavors of black cherry, raspberry, sweet herbs and rose petals with a finish that is lively and vibrant. Pairs well with salmon, lamb, pork or filet mignon.',
      price: 14.99,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h12/h87/12343347544094.png',
      categoryId: cabernet.id
    }),
    //07
    Product.create({
      name: 'Caymus Cabernet',
      description:
        'Napa, CA- Possibly Californias most consistent producer of great Cabernet, the Wagner family are Napa pioneers. Featuring decadent ripe blackberry flavors with undertones of vanilla and toasted oak. A rich and delicious wine, ready to enjoy now!',
      price: 81.97,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/hda/h26/12291755343902.png',
      categoryId: cabernet.id
    }),
    //08
    Product.create({
      name: 'Iter Cabernet Napa',
      description:
        'Napa, CA- Elegant with layered flavors of blackberry, currants, black cherry, and cocoa. The vibrant finish is smooth with fine grained tannins. Great on its own, this Cabernet is also a very versatile food pairing wine due to its medium-body and structured, fresh finish.',
      price: 18.99,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/haf/hbd/12343350001694.png',
      categoryId: cabernet.id
    }),
    //09
    Product.create({
      name: 'Butter Chardonnay',
      description:
        'California - Butter Chardonnay has aromas of apple pie and a rich creaminess that surrounds you at each sip. Aged in oak, this wine sees brightness, complexity and depth in the creaminess.',
      price: 17.97,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h5f/h27/12396318425118.png',
      categoryId: cabernet.id
    }),
    //10
    Product.create({
      name: 'Sonoma-Cutrer Chardonnay Sonoma Coast',
      description:
        'Intl Wine Cellar-Sonoma Coast, CA- Flavors of lemon, apple, pear, pineapple and cantaloupe - the full array of Sonomas cornucopia of fruit, join a nutty, spicy, lightly oak profile that stakes out a unique territory sure to please those who love Chardonnay.',
      price: 21.97,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h55/h75/12291728539678.png',
      categoryId: cabernet.id
    })
  ])
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
