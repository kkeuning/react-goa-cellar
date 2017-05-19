import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './pages/App';
import Home from './pages/Home';
import Bottles from './pages/Bottles';
import Accounts from './pages/Accounts';

export default () => (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="/bottles" component={Bottles} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/home" component={Home} />
      <Route path="*" component={Home} />
    </Route>
  </Router>
);
