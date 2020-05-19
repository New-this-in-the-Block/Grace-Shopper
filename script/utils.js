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

function compareNames(key, order = 'ascending') {
  return function innerSort(a, b) {
    const first = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key] * 1;
    const second = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key] * 1;

    let comparison = 0;
    (first > second) ? comparison = 1 : comparison = -1
   
    return (
      (order === 'descending') ? (comparison * -1) : comparison
    );
  };
}
function comparePrices(key, order = 'ascending') {
  return function innerSort(a, b) {
    const first = (typeof a[key] === 'string') ? a[key] * 1 : a[key] * 1;
    const second = (typeof b[key] === 'string') ? b[key] * 1 : b[key] * 1;

    let comparison = 0;
    (first > second) ? comparison = 1 : comparison = -1
   
    return (
      (order === 'descending') ? (comparison * -1) : comparison
    );
  };
}


export {
  calculateTotal, getRandomInt, biggestSeller, compareNames, comparePrices
}