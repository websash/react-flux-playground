import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import joinClasses from 'react/lib/joinClasses'
import s from './Button.css'

class Button extends React.Component {
  static propTypes = {
    navTo: PropTypes.string,
    className: PropTypes.string
  }

  render() {
    const {navTo, children, className} = this.props
    return (
      navTo
      ? <Link to={navTo} {...this.props} className={joinClasses(className, s.btn)}>
          {children}</Link>
      : <button {...this.props} className={joinClasses(className, s.btn)}>
          {children}</button>
      )
  }
}

export default Button
