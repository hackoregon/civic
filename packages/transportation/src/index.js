import React from 'react';
import { Route, Router } from 'react-router';

import { App, Example, CrashData } from './components/index';

const routes = history => (
  <Router history={history}>
    <Route path="/transportation" component={App} />
    <Route path="/example" component={Example} />
    <Route path="/crash_data" component={CrashData} />
  </Router>
);

export default routes;
