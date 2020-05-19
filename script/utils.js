

const calculateTotal = (cart) => {
  const subTotal = cart.lineItems.reduce( (total, item) => total + (item.quantity * item.product.price), 0)
  const tax = (subTotal * 0.08)
  const total = (subTotal + tax)
  return [subTotal.toFixed(2), tax.toFixed(2), total.toFixed(2)]
}

function biggestSeller(products) {
  return products.reduce((acc, product)=> {
      acc = acc.quantity < product.quantity ? acc : product
      return acc
  }, {})
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



export {
  calculateTotal, getRandomInt, biggestSeller
}