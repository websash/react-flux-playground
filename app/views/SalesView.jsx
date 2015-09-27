import React, {PropTypes} from 'react'
import Spinner from '../components/Spinner'
import storesConnector from '../utils/storesConnector'
import ProductsStore from '../stores/ProductsStore'
import PrListing from '../components/Products/Listing'
import Categories from '../components/Categories'
import * as acr from '../actionCreators'
import s from './views.css'

function stateFromStores(props) {
  return {catalog: ProductsStore.getCatalog(props)}
}

@storesConnector([ProductsStore], stateFromStores)
class SalesView extends React.Component {

  render() {
    return (
      <section className={s.main}>
        <div className={s.primary}>
          <h1>Sales <Spinner active={ProductsStore.pending} /></h1>
          <PrListing L="2" XL="3" {...this.props} />
        </div>
        <div className={s.secondary}>
          <Categories {...this.props} />
        </div>
      </section>
    )
  }
}

export default SalesView
