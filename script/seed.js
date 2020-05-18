'use strict'
const db = require('../server/db')
const {
  User,
  Product,
  Category,
  LineItem,
  Order,
  Review
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [cody, murphy] = await Promise.all([
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
    beer11,
    beer12,
    beer13,
    beer14,
    beer15,
    beer16,
    beer17,
    beer18,
    beer19,
    beer20,

    wine01,
    wine02,
    wine03,
    wine04,
    wine05,
    wine06,
    wine07,
    wine08,
    wine09,
    wine11,
    wine12,
    wine13,
    wine14,
    wine15,
    wine16,
    wine17,
    wine18,
    wine19,
    wine20,
  ] = await Promise.all([
    //01
    Product.create({
      alcohol: 'Beer',
      name: 'Missile IPA',
      description:
        'An American India Pale Ale with firm bitterness and intense citrusy hop aromas. Made with two-row pale ale malt and dry hopped with simcoe, cascade, summit, and more for the full experience of an American IPA.',
      price: 4,
      quantity: 3,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/missile-ipa-349069_1024x1024@2x.jpg?v=1582526620',
      categoryId: ipa.id
    }),
    //02
    Product.create({
      alcohol: 'Beer',
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
      alcohol: 'Beer',
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
      alcohol: 'Beer',
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
      alcohol: 'Beer',
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
      alcohol: 'Beer',
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
      alcohol: 'Beer',
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
      alcohol: 'Beer',
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
      alcohol: 'Beer',
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
      alcohol: 'Beer',
      name: 'McDoogles Nitro Irish Stout',
      description:
        'McDoogles will bring you right back to your favorite pub, sitting at the bar having your favorite stout. This brew is big and bold, yet smooth and creamy.',
      price: 16,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/mcdoogles-nitro-irish-stout-435016_1024x1024@2x.jpg?v=1588445533',
      categoryId: stout.id
    }),
    //11
    Product.create({
      alcohol: 'Beer',
      name: 'Resistance is Fruitile (Tropical Fruit)',
      description:
        'Resistance is Fruitile is here to bring you early summer in a can! This kettle sour features 500 lbs of tropical fruit per batch. Gentle aromas of pineapple, mango, passion fruit, and guava carry through the beer start to finish. The sour factor is not mouth puckering but instead, delicate – allowing the fruit to present. The beer pours a straw gold. Light bodied and very refreshing. Grab a beach towel and set up shop for an island vacation in your living room. Tiny island umbrellas for your glass or can not included.',
      price: 4,
      quantity: 150,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/resistance-is-fruitile-tropical-fruit-573636_1024x1024@2x.jpg?v=1588019460',
      categoryId: lager.id
    }),
    //12
    Product.create({
      alcohol: 'Beer',
      name: 'Lavenade',
      description:
        'Fresh sour fermented in stainless steel tanks with lavender, lemon juice, and lemon zest.',
      price: 14,
      quantity: 150,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/lavenade_1024x1024@2x.jpg?v=1588939000',
      categoryId: ipa.id
    }),
    //13
    Product.create({
      alcohol: 'Beer',
      name: 'Zone Expansion',
      description:
        'Sour IPA blended with fresh peach and tangerine purees, dry-hopped with Cascade.',
      price: 13,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/zone-expansion-341715_1024x1024@2x.jpg?v=1582526696',
      categoryId: stout.id
    }),
    //14
    Product.create({
      alcohol: 'Beer',
      name: 'Fourth Wave',
      description:
        'Sour Ale with Lingonberry, Sanshō and Lemon Verbena. Dry-hopped with 2020 Pink Boots blend: Azacca, El Dorado, Idaho Gem + Loral. Notes of violet, coriander, fruity pebbles, lemonheads, tongue tingles.',
      price: 12,
      quantity: 150,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/fourth-wave-500648_1024x1024@2x.jpg?v=1588445468',
      categoryId: stout.id
    }),
    //15
    Product.create({
      alcohol: 'Beer',
      name: 'Can I Get A Wit Wit?',
      description:
        'Refreshing Belgian-style Wit dry-hopped with all-American Amarillo. The traditional ingredients of coriander and orange peel combine with modern brewing styles to create a uniquely balanced and bright beer.',
      price: 15,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/can-i-get-a-wit-wit-224005_1024x1024@2x.jpg?v=1588204934',
      categoryId: stout.id
    }),
    //16
    Product.create({
      alcohol: 'Beer',
      name: 'Post No Pils',
      description:
        'New York City Pilsner brewed with New York City water. A thoroughly local craft beer, clean and crisp.',
      price: 14,
      quantity: 57,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/post-no-pils-367438_1024x1024@2x.jpg?v=1582526627',
      categoryId: ipa.id
    }),
    //17
    Product.create({
      alcohol: 'Beer',
      name: 'Queens County Pilsner',
      description:
        'Crisp, clean Pilsner from Mikkeller NYC, brewed at Citi Field in Queens.',
      price: 13,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/queens-county-pilsner-675025_1024x1024@2x.jpg?v=1588958709',
      categoryId: lager.id
    }),
    //18
    Product.create({
      alcohol: 'Beer',
      name: 'Aperitif Pilsner',
      description:
        'A standout representation of a classic pilsner, this lager is light, crisp, and bready.',
      price: 11,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/aperitif-pilsner-448662_1024x1024@2x.jpg?v=1582526382',
      categoryId: stout.id
    }),
    //19
    Product.create({
      alcohol: 'Beer',
      name: 'Steeped Emperors Lemon Saison',
      description:
        'The lemon combination within the Steeped Emperors Lemon Saison highlights intense flavors and aromas that are balanced by the acidity and fruit flavors of the Saison yeast and Sorachi Ace hops. We use a double-steep process to showcase the lemon profile and the resulting Saison highlights flavors of lemon meringue pie with the aromatics of a Meyer lemon. This beer pairs well with lighter seafood dishes such as grilled shrimp or sautéed scallops or after dark with a lemon tart or lemon sugar cookie.',
      price: 11,
      quantity: 53,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/steeped-emperors-lemon-saison-552734_1024x1024@2x.jpg?v=1582526648',
      categoryId: stout.id
    }),
    //20
    Product.create({
      alcohol: 'Beer',
      name: 'Watermelon & Cucumber',
      description:
        'Quite simply two of our favorite ingredients in any cocktail, the Watermelon and Cucumber is a perfectly refreshing hard seltzer. Aroma and taste is fairly balanced between the two flavors. Made with simple and real ingredients including sparkling water, alcohol from cold fermented cane sugar, watermelon extract and cucumber extract.',
      price: 13,
      quantity: 50,
      imageURL:
        'https://cdn.shopify.com/s/files/1/0058/8854/0731/products/watermelon-cucumber-217931_1024x1024@2x.jpg?v=1588181397',
      categoryId: stout.id
    }),

    //01
    Product.create({
      alcohol: 'Wine',
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
      alcohol: 'Wine',
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
      alcohol: 'Wine',
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
      alcohol: 'Wine',
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
      alcohol: 'Wine',
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
      alcohol: 'Wine',
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
      alcohol: 'Wine',
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
      alcohol: 'Wine',
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
      alcohol: 'Wine',
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
      alcohol: 'Wine',
      name: 'Sonoma-Cutrer Chardonnay Sonoma Coast',
      description:
        'Intl Wine Cellar-Sonoma Coast, CA- Flavors of lemon, apple, pear, pineapple and cantaloupe - the full array of Sonomas cornucopia of fruit, join a nutty, spicy, lightly oak profile that stakes out a unique territory sure to please those who love Chardonnay.',
      price: 21.97,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h55/h75/12291728539678.png',
      categoryId: cabernet.id
    }),
    //11
    Product.create({
      alcohol: 'Wine',
      name: 'Gekkeikan Horin Sake',
      description:
        "Small batch microbrew, limited production. Slowly fermented at low temperatures for a more refined flavor. Mild, fruity aroma, hints of cantaloupe and honeysuckle, and a long, clean finish.",
      price: 34.99,
      quantity: 35,
      imageURL:
        'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h30/h1e/9852004466718.png',
      categoryId: pinot.id
    }),
    //12
    Product.create({
      alcohol: 'Wine',
      name: 'Mascota Vineyards Unanime',
      description:
        'Alto Adige, Italy- Crisp and refreshing Pinot Grigio handcrafted by award-winning winemaker Peter Zemmer. This complex white reveals flavors of citrus and tree fruits with nuances of mineral, all showcased by a lengthy finish. Try with catfish, cod or snapper.',
      price: 24.99,
      quantity: 55,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/h36/h64/12279038705694.png',
      categoryId: cabernet.id
    }),
    //13
    Product.create({
      alcohol: 'Wine',
      name: 'Sextant Cabernet Sauvignon Paso Robles',
      description:
        'Paso Robles, Central Coast, CA- Cherries combine with crushed cranberries to offer a delectable first impression. Accents of pomegranate and dark chocolate are infused with hints of sandalwood. The limber tannins and balanced acidity provide an elastic structure.',
      price: 22.99,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/hd0/h3d/8802780217374.png',
      categoryId: cabernet.id
    }),
    //14
    Product.create({
      alcohol: 'Wine',
      name: 'Vennstone Pinot Noir Tri',
      description:
        'California - We are big fans of Joe Wagner and we think you will be too! The creator of Belle Glos brings together the best fruit from Monterey, Sonoma, and Santa Barbara counties for a full-bodied fruit-bomb thats stunning with grilled salmon, pork ribs or mushroom pizza.',
      price: 19.99,
      quantity: 68,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/h9b/h23/11931338407966.png',
      categoryId: pinot.id
    }),
    //15
    Product.create({
      alcohol: 'Wine',
      name: 'Verada Pinot Noir Tri-County',
      description:
        'Monterey, Sonoma, Santa Barbara, CA - This Pinot Noir has an excellent oak structure, rich, complex, and nuanced black currant and raspberry notes. The grapes are hand picked and the wine spends 16 months in French oak to smooth it out and preserve the richness and finesse. Vegan',
      price: 16.99,
      quantity: 56,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/h55/hfe/12279039328286.png',
      categoryId: pinot.id
    }),
    //16
    Product.create({
      alcohol: 'Wine',
      name: 'Yellow Tail Chardonnay',
      description:
        'South East Australia- A blend of selected parcels of fruit from some of Australias best growing areas, this wine reveals citrus and honeydew flavors nuanced by subtle oak aromas. The palate is soft yet fresh, with balanced acidity and a smooth, creamy finish. A great party wine.',
      price: 11.97,
      quantity: 57,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/h5e/he0/12140754042910.png',
      categoryId: chardonnay.id
    }),
    //17
    Product.create({
      alcohol: 'Wine',
      name: 'Frank Family Chardonnay Napa',
      description:
        'Beverage Dynamics-Carneros, Napa, California - "Soft pear nose; creamy texture with a lovely, balanced style and good length; juicy and bright with lively acidity, vanilla, and oak." Try pairing this wine with poultry, pasta dishes, and salads.',
      price: 34.97,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/h27/hc4/9014678913054.png',
      categoryId: chardonnay.id
    }),
    //18
    Product.create({
      alcohol: 'Wine',
      name: 'Santa Margherita Pinot Grigio',
      description:
        'Alto Adige, Italy- This dry white wine has a straw yellow color. Its clean, intense aroma and bone-dry taste (with an appealing flavor of Golden Delicious apples) make Santa Margheritas Pinot Grigio a wine of great personality and versatility.',
      price: 22.97,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/h83/h00/12291761602590.png',
      categoryId: pinot.id
    }),
    //19
    Product.create({
      alcohol: 'Wine',
      name: 'Albino Armani Pinot Grigio Corvara',
      description:
        'Valdadige, Italy - A single vineyard of unparalleled purity. The flavors of apple and pear are accented with traces of white flower and mineral notes. Perfectly balanced with a long and complex finish. This wine is medium-bodied and pairs great with seafood.',
      price: 14.99,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/h72/hcc/12262836502558.png',
      categoryId: pinot.id
    }),
    //20
    Product.create({
      alcohol: 'Wine',
      name: 'Kupelwieser Pinot Grigio Alto Adige',
      description:
        'Alto Adige, Italy- Crisp and refreshing Pinot Grigio handcrafted by award-winning winemaker Peter Zemmer. This complex white reveals flavors of citrus and tree fruits with nuances of mineral, all showcased by a lengthy finish. Try with catfish, cod or snapper.',
      price: 16.99,
      quantity: 50,
      imageURL:
        'https://www.totalwine.com/dynamic/x300,sq/media/sys_master/twmmedia/h0d/h72/9067094016030.png',
      categoryId: cabernet.id
    }),
  ])

  const order1 = await Order.create({userId: cody.id, status: 'Invoice'})
  const order2 = await Order.create({userId: cody.id, status: 'Invoice'})

  const [line1, line2, line3, line4, line5, line6] = await Promise.all([
    LineItem.create({quantity: 3, productId: beer01.id, orderId: order1.id}),
    LineItem.create({quantity: 2, productId: beer06.id, orderId: order1.id}),
    LineItem.create({quantity: 4, productId: beer02.id, orderId: order1.id}),
    LineItem.create({quantity: 4, productId: wine01.id, orderId: order2.id}),
    LineItem.create({quantity: 1, productId: wine03.id, orderId: order2.id}),
    LineItem.create({quantity: 2, productId: wine04.id, orderId: order2.id})
  ])

  await Review.create({
    content:
      "I didn't like this one as much as I thought I would.  It's not bad hence the 3 rating.  A bit too bitter for my taste but good color and aroma",
    rating: 3,
    LineItemId: line1.id
  })
  await Review.create({
    content:
      "With as much advertising this brand got awhile back, you'd thought they came with a decent product.  This is really bottom of the barrel stuff, pun intended, but with a mid-tier price.",
    rating: 1,
    LineItemId: line4.id
  })
  await Review.create({
    content:
      "This is my go-to!  Great taste, great price, great name, and they're right goes great with some chops.",
    rating: 5,
    LineItemId: line6.id
  })

  console.log(`seeded successfully`)
}

// We've separated the `` function from the `run` function.
// This way we can isolate the error handling and exit trapping.
// The `` function is concerned only with modifying the database.
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

// Execute the `` function, IF we ran this module directly (`node `).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of ``.
if (module === require.main) {
  runSeed()
}

// we export the  function for testing purposes (see `./.spec.js`)
module.exports = seed
