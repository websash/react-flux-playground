import test from 'tape'
import * as cart from './cart'

const catalog = [
  {id: 1, title: 'foo', price: 6},
  {id: 2, title: 'bar', price: 8, sale_price: 5},
  {id: 3, title: 'baz', price: 7, sale_price: 4},
  {id: 4, title: 'fuz', price: 3}
]

test('addProduct()', assert => { assert.plan(3)
    let _cart = []
    _cart = cart.addProduct(catalog[0], _cart)

    assert.deepEqual(_cart, [
      {product: catalog[0], qty: 1}
    ],
    'should add product to empty cart')

    // ---------------------------------------------------
    _cart = [
      {product: catalog[0], qty: 1},
      {product: catalog[1], qty: 1}
    ]
    _cart = cart.addProduct(catalog[2], _cart)

    assert.deepEqual(_cart, [
      {product: catalog[0], qty: 1},
      {product: catalog[1], qty: 1},
      {product: catalog[2], qty: 1}
    ],
    'should add product to non-empty cart')

    // ---------------------------------------------------
    _cart = [
      {product: catalog[0], qty: 1},
      {product: catalog[1], qty: 1},
      {product: catalog[2], qty: 1}
    ]
    _cart = cart.addProduct(catalog[1], _cart)
    _cart = cart.addProduct(catalog[2], _cart)
    _cart = cart.addProduct(catalog[2], _cart)

    assert.deepEqual(_cart, [
      {product: catalog[0], qty: 1},
      {product: catalog[1], qty: 2},
      {product: catalog[2], qty: 3}
    ],
    'should increment product if it\'s already been added to cart')
})


test('incrementProduct()', assert => { assert.plan(1)
    let _cart = [
      {product: catalog[0], qty: 1},
      {product: catalog[1], qty: 1},
      {product: catalog[2], qty: 1}
    ]
    _cart = cart.incrementProduct(catalog[0], _cart)
    _cart = cart.incrementProduct(catalog[1], _cart)

    assert.deepEqual(_cart, [
      {product: catalog[0], qty: 2},
      {product: catalog[1], qty: 2},
      {product: catalog[2], qty: 1}
    ],
    'should increment given product in cart')
})


test('decrementProduct()', assert => { assert.plan(2)
    let _cart = [
      {product: catalog[0], qty: 5},
      {product: catalog[1], qty: 6},
      {product: catalog[2], qty: 7}
    ]
    _cart = cart.decrementProduct(catalog[0], _cart)
    _cart = cart.decrementProduct(catalog[2], _cart)

    assert.deepEqual(_cart, [
      {product: catalog[0], qty: 4},
      {product: catalog[1], qty: 6},
      {product: catalog[2], qty: 6}
    ],
    'should decrement given product in cart')

    // ---------------------------------------------------
    _cart = [{product: catalog[0], qty: 3}]
    _cart = cart.decrementProduct(catalog[0], _cart)
    _cart = cart.decrementProduct(catalog[0], _cart)
    _cart = cart.decrementProduct(catalog[0], _cart)

    assert.deepEqual(_cart, [
      {product: catalog[0], qty: 1}
    ],
    'should decrement till one')
})


test('removeProduct()', assert => { assert.plan(1)
    let _cart = [
      {product: catalog[0], qty: 7},
      {product: catalog[1], qty: 8},
      {product: catalog[2], qty: 9}
    ]
    _cart = cart.removeProduct(catalog[1], _cart)
    _cart = cart.removeProduct(catalog[1], _cart)

    assert.deepEqual(_cart, [
      {product: catalog[0], qty: 7},
      {product: catalog[2], qty: 9}
    ],
    'should remove given product from cart, idempotent')
})


test('cartTotal()', assert => { assert.plan(1)

    let _cart = [
      {product: catalog[0], qty: 2},
      {product: catalog[1], qty: 2},
      {product: catalog[2], qty: 2},
      {product: catalog[3], qty: 2}
    ]
    assert.equal(cart.cartTotal(_cart), 36,
    'should calculate cart total correctly')
})
