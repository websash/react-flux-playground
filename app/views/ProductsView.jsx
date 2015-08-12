import React, { PropTypes, cloneElement } from 'react';
import Categories from '../components/Categories';
import CategoriesStore from '../stores/CategoriesStore';
import storesConnector from '../utils/storesConnector';
import s from './views.css';
import PrListing from '../components/Products/Listing';

// const { CSSTransitionGroup } = React.addons;

function stateFromStores(props) {
  return { category: CategoriesStore.getCategory(props) }
}

@storesConnector([CategoriesStore], stateFromStores)
class ProductsVew extends React.Component {

  render() {
    const { location, params, category, children } = this.props;
    const { pathname } = location;
    const title =
      pathname.match(/products(\/[0-9]+\/[0-9]+)?$/) && `Products` ||
      pathname.match(/sales$/) && `Sales` ||
      pathname.match(/category/) && category && `Category: ${category.name}` || '';

    return (
      <section className={s.main}>
        <div className={s.primary}>
          <h1 className="spinner">{title}</h1>
          {/* <CSSTransitionGroup component="div" transitionName="view"> */}
          {
            cloneElement(children || <PrListing/>,
              {L: '2', XL: '3', key: pathname, ...this.props})
            // children || <PrListing L="2" XL="3" key={pathname} {...this.props}/>
          }
          {/* </CSSTransitionGroup> */}
        </div>
        <div className={s.secondary}>
          <Categories {...this.props} />
        </div>
      </section>
    )
  }
}

export default ProductsVew;
