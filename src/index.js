import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Routes from './routes';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
      <Routes/>
  </Provider>,
  document.getElementById('root')
);
