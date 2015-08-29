export function isProductInCart({ id }, cart) {
  return cart.some(itm => itm.product.id === id);
}

export function addProduct(product, cart) {
  return isProductInCart(product, cart) ?
    incrementProduct(product, cart) : [...cart, { product, qty: 1 }];
}

export function removeProduct({ id }, cart) {
  return cart.reduce((cart, itm) =>
    (itm.product.id !== id && cart.push(itm), cart), []);
}

export function incrementProduct({ id }, cart) {
  return cart.map(
    ({ product, qty }) =>
      ({ product, qty: product.id === id ? ++qty : qty })
  );
}

export function decrementProduct({ id }, cart) {
  return cart.map(
    ({ product, qty }) =>
      ({ product, qty: product.id === id ? Math.max(1, --qty) : qty })
  );
}

export function cartTotal(cart) {
  return +cart.map(itm =>
    +((itm.product.sale_price || itm.product.price) * itm.qty).toFixed(2)
  ).reduce((total, subtotal) => total + subtotal, 0).toFixed(2);
}
