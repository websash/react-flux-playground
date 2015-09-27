import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import Button from '../Button'
import * as acr from '../../actionCreators'
import ProductsStore from '../../stores/ProductsStore'
import storesConnector from '../../utils/storesConnector'
import joinClasses from 'react/lib/joinClasses'
import DOMPurify from 'dompurify'
import s from './Single.css'

function stateFromStores(props) {
  return { product: ProductsStore.getProduct(props) }
}

@storesConnector([ProductsStore], stateFromStores)
class Single extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    className: PropTypes.string
  }

  static contextTypes = {
    history: PropTypes.object.isRequired
  }

  componentWillMount() {
    acr.requestProducts()
  }

  render() {
    const {product: p, className} = this.props
    const {history} = this.context

    return (
      <div className={joinClasses(s.products, className)}>
      {
        p && <div>
          <h2 className={s.itmTitle}>{p.title}</h2>
          <div className={s.body}>
            <img className={s.itmImg} src={p.image} alt="product" />
            <div className={s.itmDescription}
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(p.description)}}></div>
          </div>

          <div className={s.itmMeta}>
            {p.sale_price && <p className={s.itmPrice}>${p.sale_price}</p>}
            <p className={joinClasses(s.itmPrice, p.sale_price && s.oldPrice)}>
              ${p.price}
            </p>
            <div className={s.btns}>
              <Button className={s.btn}
                onClick={acr.addProduct.bind(this, p)}>Add To Cart</Button>
              <Button className={s.btn} navTo="/products">
                {/* need route referrer  */}
                Back To Catalog
              </Button>
            </div>
          </div>
        </div>
      }
      </div>
    )
  }
}

export default Single
