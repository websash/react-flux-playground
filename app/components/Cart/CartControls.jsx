import React, { PropTypes } from 'react';
import Button from '../Button';
import * as acr from '../../actionCreators';
import s from './Cart.css';

export class ItmIncrease extends React.Component {
  static propTypes = { item: PropTypes.object }

  render() {
    return <Button className={s.btn}
      onClick={acr.increaseProduct.bind(this, this.props.item.product)}>+</Button>
  }
}

export class ItmDecrease extends React.Component {
  static propTypes = { item: PropTypes.object }
  render() {
    return <Button className={s.btn}
      onClick={acr.decreaseProduct.bind(this, this.props.item.product)}>-</Button>
  }
}

export class ItmRemove extends React.Component {
  static propTypes = { item: PropTypes.object }

  render() {
    return <Button className={s.btn}
      onClick={acr.removeProduct.bind(this, this.props.item.product)}>x</Button>
  }
}
