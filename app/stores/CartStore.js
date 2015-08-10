import * as ACT from '../actionTypes';
import { register } from '../dispatcher';
import { createStore } from '../utils/StoreUtils';

const _cart = [];

function _increaseItem(index) {
  _cart[index].qty++;
}

function _decreaseItem(index) {
  if (_cart[index].qty > 1) _cart[index].qty--;
}

function _addItem(item) {
  let cartitm = Array.find(_cart, cartitm => cartitm.item.id === item.id);
  cartitm ? cartitm.qty++ : _cart.push({item, qty: 1});
}

function _removeItem(index) {
  _cart.splice(index, 1);
}

function _cartTotal() {
  return +_cart
    .map(cartitm => +((cartitm.item.sale_price || cartitm.item.price) * cartitm.qty).toFixed(2))
    .reduce((total, subtotal) => total + subtotal, 0)
    .toFixed(2)
}

const Store = createStore({
  getCart() { return _cart },
  getCartTotal() { return _cartTotal() },

  dispatchToken: register(action => {
    switch(action.type) {
      case ACT.CART_ADD_ITEM:
        _addItem(action.item);
        break;

      case ACT.CART_REMOVE_ITEM:
        _removeItem(action.index);
        break;

      case ACT.CART_INCREASE_ITEM:
        _increaseItem(action.index);
        break;

      case ACT.CART_DECREASE_ITEM:
        _decreaseItem(action.index);
        break;

      default:
        return true;
    }

    Store.emitChange();
    return true;
  })

});

export default Store;
