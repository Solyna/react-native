
import React, { Component } from 'react';
import PageConfig from './src/PageConfig';
import { Provider } from 'react-redux';
import { store } from './src/Store/Store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PageConfig />
      </Provider>
    );
  }
}
