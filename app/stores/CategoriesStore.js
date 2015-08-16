import * as ACT from '../actionTypes';
import { register } from '../dispatcher';
import { createStore } from '../utils/StoreUtils';

let _categories = [];

const dispatcherCallback = action => {
  switch(action.type) {
    case ACT.REQUEST_CATEGORIES:
      Store.pending = true;
      break;

    case ACT.REQUEST_CATEGORIES_SUCCESS:
      Store.pending = false;
      _categories = action.data;
      break;

    case ACT.REQUEST_CATEGORIES_FAIL:
      Store.pending = false;
      // err handling...
      break;
  }
  Store.emitChange();
}

const Store = createStore({
  pending: false,

  getCategories() { return _categories },

  getCategory(props) {
    const { params } = props;
    return _categories.filter(cat => cat.id == params.categoryId)[0];
  },

  dispatchToken: register(dispatcherCallback)
});

export default Store;
