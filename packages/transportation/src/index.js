import React from 'react';
import { Route, Router } from 'react-router';

import { App, Example, NotFoundPage, CrashData } from './components/index';

const routes = history => (
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/example" component={Example} />
    <Route path="/notfoundpage" component={NotFoundPage} />
    <Route path="/CrashData" component={CrashData} />
  </Router>
);

export default routes;
