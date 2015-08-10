import React, { PropTypes } from 'react';
import Button from '../Button';
import * as acr from '../../actionCreators';
import s from './Cart.css';

export class ItmIncrease extends React.Component {
  static propTypes = { index: PropTypes.number }

  render() {
    return <Button className={s.btn}
      onClick={acr.increaseItem.bind(this, this.props.index)}>+</Button>
  }
}

export class ItmDecrease extends React.Component {
  static propTypes = { index: PropTypes.number }
  render() {
    return <Button className={s.btn}
      onClick={acr.decreaseItem.bind(this, this.props.index)}>-</Button>
  }
}

export class ItmRemove extends React.Component {
  static propTypes = { index: PropTypes.number }

  render() {
    return <Button className={s.btn}
      onClick={acr.removeItem.bind(this, this.props.index)}>x</Button>
  }
}
