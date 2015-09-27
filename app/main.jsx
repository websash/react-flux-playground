import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route} from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'
import App from './components/App'
import HomeView from './views/HomeView'
import ProductsView from './views/ProductsView'
import PrListing from './components/Products/Listing'
import PrSingle from './components/Products/Single'
import SalesView from './views/SalesView'
import CartView from './views/CartView'
import NotFound from './views/NotFoundView'


ReactDOM.render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <Route path="products" component={ProductsView}>
        <Route path="category/:categoryId" component={PrListing}/>
        <Route path=":categoryId/:productId" component={PrSingle}/>
      </Route>
      <Route path="sales" component={SalesView}/>
      <Route path="cart" component={CartView}/>
    </Route>
  </Router>
), document.getElementById('app'))

