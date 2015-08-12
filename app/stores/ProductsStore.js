import * as ACT from '../actionTypes';
import { register } from '../dispatcher';
import { createStore } from '../utils/StoreUtils';

let _catalog = [];

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

  dispatchToken: register(action => {
    switch(action.type) {
      case ACT.REQUEST_PRODUCTS:
        Store.pending = true;
        break;

      case ACT.REQUEST_PRODUCTS_SUCCESS:
        Store.pending = false;
        _catalog = action.data;
        break;

      case ACT.REQUEST_PRODUCTS_FAIL:
        Store.pending = false;
        break;

      default:
        return true;
    }

    Store.emitChange();
    return true;
  })

});

export default Store;
