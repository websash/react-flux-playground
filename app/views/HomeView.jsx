import React, {PropTypes} from 'react'
import ProductsStore from '../stores/ProductsStore'
import PrListing from '../components/Products/Listing'
import Categories from '../components/Categories'
import storesConnector from '../utils/storesConnector'
import Spinner from '../components/Spinner'
import * as acr from '../actionCreators'
import s from './views.css'

function stateFromStores(props) {
  return {catalog: ProductsStore.getCatalog(props)}
}

@storesConnector([ProductsStore], stateFromStores)
class HomeView extends React.Component {

  render() {
    return (
      <section className={s.main}>
        <div className={s.primary}>
          <h1>Deals of the Week <Spinner active={ProductsStore.pending} /></h1>
          <PrListing L="2" XL="3" {...this.props} />
        </div>
        <div className={s.secondary}>
          <Categories {...this.props} />
        </div>
      </section>
    )
  }
}

export default HomeView
