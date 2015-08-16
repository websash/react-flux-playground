import expect from 'expect';
import * as cart from './cart';

describe('Cart Operations', () => {
  const catalog = [
    {id: 1, title: 'foo', price: 6},
    {id: 2, title: 'bar', price: 8, sale_price: 5},
    {id: 3, title: 'baz', price: 7, sale_price: 4},
    {id: 4, title: 'fuz', price: 3}
  ]

  it('addProduct: should add product to empty cart', () => {
    let _cart = [];
    _cart = cart.addProduct(catalog[0], _cart);

    expect(_cart).toEqual([
      { product: catalog[0], qty: 1 }
    ]);
  });

  it('addProduct: should add product to non-empty cart', () => {
    let _cart = [
      { product: catalog[0], qty: 1 },
      { product: catalog[1], qty: 1 }
    ];
    _cart = cart.addProduct(catalog[2], _cart);

    expect(_cart).toEqual([
      { product: catalog[0], qty: 1 },
      { product: catalog[1], qty: 1 },
      { product: catalog[2], qty: 1 }
    ]);
  });

  it('addProduct: should increment product if it\'s already been added to cart', () => {
    let _cart = [
      { product: catalog[0], qty: 1 },
      { product: catalog[1], qty: 1 },
      { product: catalog[2], qty: 1 }
    ];
    _cart = cart.addProduct(catalog[1], _cart);
    _cart = cart.addProduct(catalog[2], _cart);
    _cart = cart.addProduct(catalog[2], _cart);

    expect(_cart).toEqual([
      { product: catalog[0], qty: 1 },
      { product: catalog[1], qty: 2 },
      { product: catalog[2], qty: 3 }
    ]);
  });

  it('incrementProduct: should increment given product in cart', () => {
    let _cart = [
      { product: catalog[0], qty: 1 },
      { product: catalog[1], qty: 1 },
      { product: catalog[2], qty: 1 }
    ];
    _cart = cart.incrementProduct(catalog[0], _cart);
    _cart = cart.incrementProduct(catalog[1], _cart);

    expect(_cart).toEqual([
      { product: catalog[0], qty: 2 },
      { product: catalog[1], qty: 2 },
      { product: catalog[2], qty: 1 }
    ]);
  });

  it('decrementProduct: should decrement given product in cart', () => {
    let _cart = [
      { product: catalog[0], qty: 5 },
      { product: catalog[1], qty: 6 },
      { product: catalog[2], qty: 7 }
    ];
    _cart = cart.decrementProduct(catalog[0], _cart);
    _cart = cart.decrementProduct(catalog[2], _cart);

    expect(_cart).toEqual([
      { product: catalog[0], qty: 4 },
      { product: catalog[1], qty: 6 },
      { product: catalog[2], qty: 6 }
    ]);
  });

  it('decrementProduct: should decrement till one, idempotent thereafter', () => {
    let _cart = [
      { product: catalog[0], qty: 3 }
    ];
    let out1, out2, out3;
    _cart = cart.decrementProduct(catalog[0], _cart);
    _cart = out1 = cart.decrementProduct(catalog[0], _cart);
    _cart = out2 = cart.decrementProduct(catalog[0], _cart);
    _cart = out3 = cart.decrementProduct(catalog[0], _cart);

    expect(out1).toEqual(out2).toEqual(out3);
    expect(_cart).toEqual([
      { product: catalog[0], qty: 1 }
    ]);
  });

  it('removeProduct: should remove given product from cart, idempotent', () => {
    let _cart = [
      { product: catalog[0], qty: 7 },
      { product: catalog[1], qty: 8 },
      { product: catalog[2], qty: 9 }
    ];
    _cart = cart.removeProduct(catalog[1], _cart);
    _cart = cart.removeProduct(catalog[1], _cart);

    expect(_cart).toEqual([
      { product: catalog[0], qty: 7 },
      { product: catalog[2], qty: 9 }
    ]);
  });

  it('cartTotal: should calc cart total', () => {
    let _cart = [
      { product: catalog[0], qty: 2 },
      { product: catalog[1], qty: 2 },
      { product: catalog[2], qty: 2 },
      { product: catalog[3], qty: 2 }
    ];
    expect(cart.cartTotal(_cart)).toEqual(36);
  });

});
