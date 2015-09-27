import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import Button from '../Button'
import * as acr from '../../actionCreators'
import joinClasses from 'react/lib/joinClasses'
import s from './Products.css'


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
    acr.requestProducts()
  }

  render() {
    const {catalog, className, M, L, XL} = this.props

    const itmClasses = joinClasses(s.itm,
      (M ? s['itm_M' + M ] : ''),
      (L ? s['itm_L' + L ] : ''),
      (XL ? s['itm_XL' + XL] : '')
    )

    return (
      <div>
      <div className={joinClasses(s.products, className)}>
      {
        catalog && catalog.map(p =>
          <div className={itmClasses} key={p.id}>

            <Link className={s.itmTitle} to={`/products/${p.category_id}/${p.id}`}>
              <h3>{p.title}</h3>
            </Link>

            <Link className={s.itmImg} to={`/products/${p.category_id}/${p.id}`}>
              <img src={p.image} />
            </Link>

            <div className={s.itmMeta}>
              {p.sale_price && <p className={s.itmPrice}>${p.sale_price}</p>}
              <p className={joinClasses(s.itmPrice, p.sale_price && s.oldPrice)}>
                ${p.price}
              </p>
              <Button className={s.itmAdd2Cart}
                onClick={acr.addProduct.bind(this, p)}>To Cart
              </Button>
            </div>

            <p className={s.itmSummary}>{p.summary}</p>
          </div>
        )
      }
      </div>
      </div>
    )
  }
}

export default Listing
