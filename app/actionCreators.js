import * as ACT from './actionTypes';
import { dispatch } from './dispatcher';
import * as API from './api';

export function requestProducts() {
  dispatch(ACT.REQUEST_PRODUCTS);
  API.getProducts()
    .then(API.utils.handleStatus).then(API.utils.handleJSON)
    .then(data => dispatch(ACT.REQUEST_PRODUCTS_SUCCESS, {data}))
    .catch(error => dispatch(ACT.REQUEST_PRODUCTS_FAIL, {error}));
}

export function requestCategories() {
  dispatch(ACT.REQUEST_CATEGORIES);
  API.getCategories()
    .then(API.utils.handleStatus).then(API.utils.handleJSON)
    .then(data => dispatch(ACT.REQUEST_CATEGORIES_SUCCESS, {data}))
    .catch(error => dispatch(ACT.REQUEST_CATEGORIES_FAIL, {error}));
}

export function addProduct(product) {
  dispatch(ACT.CART_ADD_PRODUCT, {product})
}

export function removeProduct(product) {
  dispatch(ACT.CART_REMOVE_PRODUCT, {product})
}

export function decreaseProduct(product) {
  dispatch(ACT.CART_DECREMENT_PRODUCT, {product})
}

export function increaseProduct(product) {
  dispatch(ACT.CART_INCREMENT_PRODUCT, {product})
}
