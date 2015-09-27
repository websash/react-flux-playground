import React from 'react'
import Cart from '../components/Cart'
// import Categories from '../components/Categories'
import joinClasses from 'react/lib/joinClasses'
import s from './views.css'


class CartView extends React.Component {

  render() {
    return (
      <section className={s.main}>
        <div className={s.primary}>
          <Cart />
        </div>
      </section>
    )
  }
}

export default CartView
