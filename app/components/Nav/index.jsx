import React from 'react';
import NavItem from './NavItem';
import CartSummary from '../Cart/CartSummary';
import joinClasses from 'react/lib/joinClasses';
import s from './Nav.css';

export default class Nav extends React.Component {
  render() {
    return (
      <nav className={s.navbar}>
        <div className={s.container}>
          <ul className={s.nav}>
            <NavItem navTo="/">Home</NavItem>
            <NavItem navTo="/products">Products</NavItem>
            <NavItem navTo="/sales">Sales</NavItem>

          </ul>
          <CartSummary className={s.cartsummary} />
        </div>
      </nav>
      )
  }
}
