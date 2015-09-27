import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import joinClasses from 'react/lib/joinClasses'
import s from './Nav.css'

export default class NavItem extends React.Component {
  static propTypes = {
    navTo: PropTypes.string,
    className: PropTypes.string
  }

  static contextTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const {navTo, children, onClick, className} = this.props
    const {history, location: {pathname}} = this.context

    // console.log(navTo, '\t', pathname, '\t', history.isActive(navTo))

    const classes = joinClasses(s.navItem, className,
      navTo === pathname ||
      navTo !== '/' && pathname !== '/' &&
      history.isActive(navTo) ? 'active' : '')

    return (
      <li className={classes}>
        <Link to={navTo} onClick={onClick}>{children}</Link>
      </li>
      )
  }
}
