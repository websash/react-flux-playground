import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {ItmIncrease, ItmDecrease, ItmRemove} from './CartControls'
import CartStore from '../../stores/CartStore'
import storesConnector from '../../utils/storesConnector'
import s from './Cart.css'

function stateFromStores(props) {
  return {
    items: CartStore.getCart(),
    total: CartStore.getCartTotal()
  }
}

@storesConnector([CartStore], stateFromStores)
export default class Cart extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    total: PropTypes.number
  }

  render() {
    const {items, total} = this.props
    return (
      <table className={s.cart}>
      {
        items.length > 0 &&
          <thead>
            <tr>
              <th className={s.left}>Item</th>
              <th className={s.right}>Quantity</th>
              <th className={s.right}>Subtotal</th>
              <th></th>
            </tr>
          </thead>
      }
      <tbody>
      {
        items.length > 0
        ? items.map(itm => {
            const {id, category_id, title, price, sale_price} = itm.product
            return (
              <tr key={id}>
                <td>
                  <Link to={`/products/${category_id}/${id}`}>
                    {title}</Link>
                </td>
                <td className={s.right}>{itm.qty} <span className={s.btnGroup}>
                    <ItmIncrease item={itm} /><ItmDecrease item={itm} />
                  </span>
                </td>
                <td className={s.right}>
                  ${+((sale_price || price) * itm.qty).toFixed(2)}
                </td>
                <td className={s.right}><ItmRemove item={itm} /></td>
              </tr>
            )
          })
        : <tr><td colSpan="4" className={s.center}>Your cart is empty</td></tr>
      }
      </tbody>
      {
        items.length > 0 &&
          <tfoot>
            <tr>
              <td></td>
              <td className={s.right}>Cart Total:</td>
              <td className={s.right}>${total}</td>
              <td></td>
            </tr>
          </tfoot>
      }
      </table>
    )
  }
}
