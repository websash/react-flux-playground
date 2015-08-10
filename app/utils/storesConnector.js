import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';

export default function storesConnector(stores, getStateFromStores) {
  return function(Component) {
    const displayName = Component.displayName || Component.name || 'Component';

    return class StoresConnector extends React.Component {
      static displayName = `${displayName}StoresConnector`;

      constructor(props) {
        super(props);
        this.handleStoresChanged = this.handleStoresChanged.bind(this);
        this.state = getStateFromStores(props);
      }

      componentDidMount() {
        stores.forEach(store =>
          store.addChangeListener(this.handleStoresChanged)
        );
      }

      componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps, this.props)) {
          this.setState(getStateFromStores(nextProps));
        }
      }

      componentWillUnmount() {
        stores.forEach(store =>
          store.removeChangeListener(this.handleStoresChanged)
        );
      }

      handleStoresChanged() {
        this.setState(getStateFromStores(this.props));
      }

      render() {
        return React.createElement(Component, {...this.state, ...this.props});
      }
    }
  }
}
