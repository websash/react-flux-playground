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
    router: PropTypes.func.isRequired
  }

  render() {
    const { navTo, children, onClick, className } = this.props;

    const classes = joinClasses(s.navItem, className,
      (this.context.router.isActive(navTo) ? 'active' : ''));

    const anchor = navTo.match(/(#.*)/);

    return (
      <li className={classes}>
        <Link to={anchor ? this.context.router.getCurrentPath() + `${anchor[1]}` : navTo}
          onClick={onClick}>{children}</Link>
      </li>
      )
  }
}
