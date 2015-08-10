import React, { PropTypes } from 'react';
import { RouteHandler } from 'react-router';
import Categories from '../components/Categories';
import CategoriesStore from '../stores/CategoriesStore';
import storesConnector from '../utils/storesConnector';
import s from './views.css';

function stateFromStores(props) {
  return { category: CategoriesStore.getCategory(props) }
}

@storesConnector([CategoriesStore], stateFromStores)
class ProductsVew extends React.Component {

  render() {
    const { path, params, category } = this.props;

    const title =
      path.match(/products(\/[0-9]+\/[0-9]+)?$/) && `Products` ||
      path.match(/sales$/) && `Sales` ||
      path.match(/category/) && category && `Category: ${category.name}` || '';

    return (
      <section className={s.main}>
        <div className={s.primary}>
          <h1 className="spinner">{title}</h1>
          <div className="fadetarget">
            <RouteHandler L="2" XL="3" {...this.props} />
          </div>
        </div>
        <div className={s.secondary}>
          <Categories category={category} />
        </div>
      </section>
    )
  }
}

export default ProductsVew;
