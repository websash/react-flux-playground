import React, { PropTypes } from 'react';
import PrListing from '../components/Products/Listing';
import * as acr from '../actionCreators';
import s from './views.css';

class HomeView extends React.Component {

  render() {
    return (
      <section className={s.main}>
        <div className={s.primary}>
          <h1 className="spinner">Deals of the Week</h1>
          <div className="fadetarget">
            <PrListing M="2" L="3" XL="4" {...this.props} />
          </div>
        </div>
      </section>
    )
  }
}

export default HomeView;
