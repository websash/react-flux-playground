import React from 'react';
import { RouteHandler } from 'react-router';
import Header from '../Header';
import Footer from '../Footer';
import s from './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className={s.flexbox}>
        <Header />
          <RouteHandler {...this.props} />
        <Footer />
      </div>
    );
  }
}
