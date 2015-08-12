import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CartStore from '../../stores/CartStore';
import storesConnector from '../../utils/storesConnector';
import joinClasses from 'react/lib/joinClasses';
import s from './Cart.css';

function stateFromStores(props) {
  return {
    items: CartStore.getCart(),
    total: CartStore.getCartTotal()
  }
}

@storesConnector([CartStore], stateFromStores)
class CartSummary extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    className: PropTypes.string
  }

  render() {
    const { items, total, className } = this.props;
    return (
      <Link to="/cart" className={joinClasses(className, s.cartsummary)}>
        Cart: { items.length > 0 ? `${items.length} / $${total}` : `empty` }
      </Link>
    )
  }
}

export default CartSummary;
