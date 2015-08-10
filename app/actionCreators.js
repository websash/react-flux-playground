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

export function selectCategory(category) {
  dispatch(ACT.SELECT_CATEGORY, {category})
}

export function addItem(item) {
  dispatch(ACT.CART_ADD_ITEM, {item})
}

export function removeItem(index) {
  dispatch(ACT.CART_REMOVE_ITEM, {index})
}

export function decreaseItem(index) {
  dispatch(ACT.CART_DECREASE_ITEM, {index})
}

export function increaseItem(index) {
  dispatch(ACT.CART_INCREASE_ITEM, {index})
}
