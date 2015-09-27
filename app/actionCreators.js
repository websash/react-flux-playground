import * as ACT from './actionTypes'
import {dispatch} from './dispatcher'
import * as API from './api'

export async function requestProducts() {
  try {
    dispatch(ACT.REQUEST_PRODUCTS)
    dispatch(ACT.REQUEST_PRODUCTS_SUCCESS, {data: await API.getProducts()})
  } catch(error) {
    dispatch(ACT.REQUEST_PRODUCTS_FAIL, {error})
  }
}

export async function requestCategories() {
  try {
    dispatch(ACT.REQUEST_CATEGORIES)
    dispatch(ACT.REQUEST_CATEGORIES_SUCCESS, {data: await API.getCategories()})
  } catch(error) {
    dispatch(ACT.REQUEST_CATEGORIES_FAIL, {error})
  }
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
