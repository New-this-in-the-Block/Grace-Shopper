const calculateTotal = (cart) => {
  const subTotal = cart.lineItems.reduce( (total, item) => total + (item.quantity * item.product.price), 0)
  const tax = (subTotal * 0.08)
  const total = (subTotal + tax)
  return [subTotal.toFixed(2), tax.toFixed(2), total.toFixed(2)]
}

export {
  calculateTotal
}