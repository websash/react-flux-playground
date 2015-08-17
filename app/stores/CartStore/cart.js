export function isProductInCart(product, cart) {
  return cart.some(itm => itm.product.id === product.id);
}

export function addProduct(product, cart) {
  return isProductInCart(product, cart) ?
    incrementProduct(product, cart) : cart.concat({product, qty: 1});
}

export function removeProduct(product, cart) {
  return cart.reduce((cart, itm) =>
    (itm.product.id !== product.id && cart.push(itm), cart), []);
}

export function incrementProduct(product, cart) {
  return cart.map(itm =>
    ({
      product: itm.product,
      qty: itm.product.id === product.id ?
        itm.qty + 1 : itm.qty
    })
  );
}

export function decrementProduct(product, cart) {
  return cart.map(itm =>
    ({
      product: itm.product,
      qty: itm.product.id === product.id ?
        Math.max(1, itm.qty - 1) : itm.qty
    })
  );
}

export function cartTotal(cart) {
  return +cart.map(itm =>
    +((itm.product.sale_price || itm.product.price) * itm.qty).toFixed(2)
  ).reduce((total, subtotal) => total + subtotal, 0).toFixed(2);
}
