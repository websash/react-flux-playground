import React, { PropTypes } from 'react';
import PrListing from '../components/Products/Listing';
import Categories from '../components/Categories';
import * as acr from '../actionCreators';
import s from './views.css';

class SalesView extends React.Component {

  render() {
    return (
      <section className={s.main}>
        <div className={s.primary}>
          <h1 className="spinner">Sales</h1>
          <PrListing L="2" XL="3" {...this.props} />
        </div>
        <div className={s.secondary}>
          <Categories {...this.props} />
        </div>
      </section>
    )
  }
}

export default SalesView;
