import React from 'react';
import { Route, Router } from 'react-router';

import { App, Example, NotFoundPage } from './components/index';

const routes = history => (
  <Router history={history}>
    <Route path="/emergency_response" component={App} />
    <Route path="/example" component={Example} />
    <Route path="/notfoundpage" component={NotFoundPage} />
  </Router>
);

export default routes;
