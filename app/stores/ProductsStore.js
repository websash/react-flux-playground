import * as ACT from '../actionTypes'
import {register, waitFor} from '../dispatcher'
import {createStore} from '../utils/StoreUtils'
import CategoriesStore from './CategoriesStore'

let _catalog = []

const dispatcherCallback = action => {
  switch(action.type) {
    case ACT.REQUEST_PRODUCTS:
      Store.pending = true
      break

    case ACT.REQUEST_PRODUCTS_SUCCESS:
      waitFor([CategoriesStore.dispatchToken])
      Store.pending = false
      _catalog = action.data
      break

    case ACT.REQUEST_PRODUCTS_FAIL:
      Store.pending = false
      // alert(`[${action.error}] ${ACT.REQUEST_PRODUCTS_FAIL}`)
      break
  }
  Store.emitChange()
}

const Store = createStore({
  pending: false,

  getCatalog({location: {pathname: pn}, params: {categoryId: cid}}) {
    return (
      /^\/$/.test(pn) && _catalog.filter(product => product.featured) ||

      /^\/sales$/.test(pn) && _catalog.filter(product => product.sale_price) ||

      /\/category/.test(pn) && cid && /^[0-9]+$/.test(cid) &&
          _catalog.filter(product => cid == product.category_id) ||

      _catalog
    )
  },

  getProduct({params: {productId: pid}}) {
    return pid && /^[0-9]+$/.test(pid) && _catalog.filter(product => pid == product.id)[0]
  },

  getTitle({location: {pathname: pn}, params}) {
    const category = CategoriesStore.getCategory({params})
    return (
      pn.match(/products(\/[0-9]+\/[0-9]+)?$/) && `Products` ||
      pn.match(/sales$/) && `Sales` ||
      pn.match(/category/) && category && `Category: ${category.name}` || ''
    )
  },

  dispatchToken: register(dispatcherCallback)
})

export default Store
