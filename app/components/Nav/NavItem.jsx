import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import joinClasses from 'react/lib/joinClasses';
import s from './Nav.css';

export default class NavItem extends React.Component {
  static propTypes = {
    navTo: PropTypes.string,
    className: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    // console.log(this.context.router.isActive(navTo));
    const { navTo, children, onClick, className } = this.props;

    const classes = joinClasses(s.navItem, className,
      (this.context.router.isActive(navTo) ? 'active' : ''));

    return (
      <li className={classes}>
        <Link to={navTo} onClick={onClick}>{children}</Link>
      </li>
      )
  }
}
