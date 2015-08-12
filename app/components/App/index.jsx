import React, { cloneElement } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import HomeView from '../../views/HomeView';
import s from './App.css';


export default class App extends React.Component {
  render() {
    return (
      <div className={s.flexbox}>
        <Header />
        {this.props.children || <HomeView {...this.props}/>}
        <Footer />
      </div>
    );
  }
}
