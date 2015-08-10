import React from 'react';
import Router from 'react-router';
import { Route, NotFoundRoute } from 'react-router';
import App from './components/app';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import PrListing from './components/Products/Listing';
import PrSingle from './components/Products/Single';
import SalesView from './views/SalesView';
import CartView from './views/CartView';
import NotFound from './views/NotFoundView';

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="home" path="/" handler={HomeView}/>
    <Route name="cart" path="/cart" handler={CartView}/>
    <Route name="products" path="/products" handler={ProductsView}>
      <Route path="" handler={PrListing}/>
      <Route name="category" path="/products/category/:categoryId" handler={PrListing}/>
      <Route name="product" path="/products/:categoryId/:productId" handler={PrSingle}/>
    </Route>
    <Route name="sales" path="/sales" handler={SalesView}/>
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) =>
  React.render(<Handler {...state} />, document.getElementById('app'))
);
