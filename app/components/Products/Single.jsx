import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import Button from '../Button';
import * as acr from '../../actionCreators';
import ProductsStore from '../../stores/ProductsStore';
import storesConnector from '../../utils/storesConnector';
import joinClasses from 'react/lib/joinClasses';
import DOMPurify from 'dompurify';
import s from './Single.css';

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
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    acr.requestProducts();
  }

  render() {
    const { product, className } = this.props;
    const { router } = this.context;

    return (
      <div className={joinClasses(s.products,
          ProductsStore.pending && 'pending', className)}>
      {
        product &&
        <div>
          <h2 className={s.itmTitle}>{product.title}</h2>
          <div className={s.body}>
            <img className={s.itmImg} src={product.image} alt="product" />
            <div className={s.itmDescription}
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.description)}}></div>
          </div>

          <div className={s.itmMeta}>
            { product.sale_price && <p className={s.itmPrice}>${product.sale_price}</p> }
            <p className={joinClasses(s.itmPrice, product.sale_price && s.oldPrice)}>
              ${product.price}
            </p>
            <div className={s.btns}>
              <Button className={s.btn}
                onClick={acr.addProduct.bind(this, product)}>Add To Cart</Button>
              <Button className={s.btn} navTo="/products">
                {/* need normalized history length or route referrer  */}
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

export default Single;
