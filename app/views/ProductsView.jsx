import React, {PropTypes, cloneElement} from 'react'
import PrListing from '../components/Products/Listing'
import Categories from '../components/Categories'
import ProductsStore from '../stores/ProductsStore'
import CategoriesStore from '../stores/CategoriesStore'
import storesConnector from '../utils/storesConnector'
import Spinner from '../components/Spinner'
import s from './views.css'

// const { CSSTransitionGroup } = React.addons

function stateFromStores(props) {
  return {
    title: ProductsStore.getTitle(props),
    catalog: ProductsStore.getCatalog(props),
    category: CategoriesStore.getCategory(props)
  }
}

@storesConnector([ProductsStore, CategoriesStore], stateFromStores)
class ProductsVew extends React.Component {

  render() {
    const {title, location: {pathname}, category, children} = this.props

    return (
      <section className={s.main}>
        <div className={s.primary}>
          <h1>{title} <Spinner active={ProductsStore.pending} /></h1>
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

export default ProductsVew
