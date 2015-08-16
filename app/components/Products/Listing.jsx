import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from '../Button';
import * as acr from '../../actionCreators';
import ProductsStore from '../../stores/ProductsStore';
import storesConnector from '../../utils/storesConnector';
import joinClasses from 'react/lib/joinClasses';
import s from './Products.css';

function stateFromStores(props) {
  return { catalog: ProductsStore.getCatalog(props) }
}

@storesConnector([ProductsStore], stateFromStores)
class Listing extends React.Component {

  static propTypes = {
    catalog: PropTypes.array,
    className: PropTypes.string,

    // num of cols at br.points
    M: PropTypes.oneOf(['2', '3', '4']),
    L: PropTypes.oneOf(['2', '3', '4']),
    XL: PropTypes.oneOf(['2', '3', '4'])
  }

  componentWillMount() {
    acr.requestProducts();
  }

  render() {
    const { catalog, className, M, L, XL } = this.props;

    const itmClasses = joinClasses(s.itm,
      (M ? s['itm_M' + M ] : ''),
      (L ? s['itm_L' + L ] : ''),
      (XL ? s['itm_XL' + XL] : '')
    );

    return (
      <div>
      <div className={joinClasses(s.products,
          ProductsStore.pending && 'pending', className)}>
      {
        catalog && catalog.map(product =>
          <div className={itmClasses} key={product.id}>

            <Link className={s.itmTitle} to={`/products/${product.category_id}/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>

            <Link className={s.itmImg} to={`/products/${product.category_id}/${product.id}`}>
              <img src={product.image} />
            </Link>

            <div className={s.itmMeta}>
              { product.sale_price && <p className={s.itmPrice}>${product.sale_price}</p> }
              <p className={joinClasses(s.itmPrice, product.sale_price && s.oldPrice)}>
                ${product.price}
              </p>
              <Button className={s.itmAdd2Cart}
                onClick={acr.addProduct.bind(this, product)}>To Cart
              </Button>
            </div>

            <p className={s.itmSummary}>{product.summary}</p>
          </div>
        )
      }
      </div>
      </div>
    )
  }
}

export default Listing;
