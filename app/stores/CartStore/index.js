import * as ACT from '../../actionTypes';
import { register } from '../../dispatcher';
import { createStore } from '../../utils/StoreUtils';
import * as cart from './cart';

let _cart = [];

const dispatcherCallback = action => {
  switch(action.type) {
    case ACT.CART_ADD_PRODUCT:
      _cart = cart.addProduct(action.product, _cart);
      break;

    case ACT.CART_REMOVE_PRODUCT:
      _cart = cart.removeProduct(action.product, _cart);
      break;

    case ACT.CART_INCREMENT_PRODUCT:
      _cart = cart.incrementProduct(action.product, _cart);
      break;

    case ACT.CART_DECREMENT_PRODUCT:
      _cart = cart.decrementProduct(action.product, _cart);
      break;
  }
  Store.emitChange();
}

const Store = createStore({
  getCart() { return _cart },
  getCartTotal() { return cart.cartTotal(_cart) },
  dispatchToken: register(dispatcherCallback)
});

export default Store;
