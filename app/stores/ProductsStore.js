import * as ACT from '../actionTypes';
import { register, waitFor } from '../dispatcher';
import { createStore } from '../utils/StoreUtils';
import CategoriesStore from './CategoriesStore';

let _catalog = [];

const dispatcherCallback = action => {
  switch(action.type) {
    case ACT.REQUEST_PRODUCTS:
      Store.pending = true;
      break;

    case ACT.REQUEST_PRODUCTS_SUCCESS:
      waitFor([CategoriesStore.dispatchToken]);
      Store.pending = false;
      _catalog = action.data;
      break;

    case ACT.REQUEST_PRODUCTS_FAIL:
      Store.pending = false;
      // err handling...
      break;
  }
  Store.emitChange();
}

const Store = createStore({
  pending: false,

  getCatalog(props) {
    // console.log('getCatalog props', props);
    const { location, params } = props;
    const { pathname } = location;

    const catalog =

      /^\/$/.test(pathname) && _catalog.filter(product => product.featured) ||

      /^\/sales$/.test(pathname) && _catalog.filter(product => product.sale_price) ||

      /\/category/.test(pathname) &&
        params.categoryId && /^[0-9]+$/.test(params.categoryId) &&
        _catalog.filter(product => params.categoryId == product.category_id) ||

      _catalog;

    return catalog;
  },

  getProduct(props) {
    const { params } = props;
    return params.productId && /^[0-9]+$/.test(params.productId) &&
      _catalog.filter(product => params.productId == product.id)[0];
  },

  getTitle(props) {
    const { location } = props;
    const { pathname } = location;
    const category = CategoriesStore.getCategory(props);

    const title =
      pathname.match(/products(\/[0-9]+\/[0-9]+)?$/) && `Products` ||
      pathname.match(/sales$/) && `Sales` ||
      pathname.match(/category/) && category && `Category: ${category.name}` || '';
    return title;
  },

  dispatchToken: register(dispatcherCallback)
});

export default Store;
