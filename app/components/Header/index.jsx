import React from 'react'
import Nav from '../Nav'
import {Link} from 'react-router'
import s from './Header.css'

class Header extends React.Component {
  render() {
    return (
      <header className={s.header}>
        <div className={s.container}>
          <Link className={s.logo} to="/"><h1>Web Shop<small>yet another shop</small></h1></Link>
        </div>
        <Nav />
      </header>
    )
  }
}

export default Header
