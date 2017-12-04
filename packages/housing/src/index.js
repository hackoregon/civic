import React from 'react';
import { Route, Router } from 'react-router';

import { App } from './components/App';

const routes = history => (
  <Router history={history}>
    <Route path="/housing" component={App} />
  </Router>
);

export default routes;
