import React from 'react'
import {Link} from 'react-router'
import s from './Footer.css'

class Footer extends React.Component {
  render() {
    return (
      <footer className={s.footer}>
        <div className={s.container}>
          <h2 className={s.logo}>Web Shop<small>yet another shop</small></h2>
          <ul className={s.links}>
            <li><Link to="home">Home</Link></li>
            <li><Link to="products">Products</Link></li>
            <li><Link to="sales">Sales</Link></li>
            <li><Link to="/#">Ipsum</Link></li>
            <li><Link to="/#">Lorem</Link></li>
            <li><Link to="/#">Contacts</Link></li>
            <li><Link to="/#">Affiliate Program</Link></li>
            <li><Link to="/#">Privacy Policy</Link></li>
          </ul>
        </div>
      </footer>
    )
  }
}

export default Footer
