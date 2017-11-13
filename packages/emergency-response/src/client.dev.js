import '@hackoregon/component-library/assets/global.styles.css';

// eslint-disable-next-line
import '!style-loader!css-loader!@hackoregon/component-library/assets/vendor/leaflet.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import { Root } from './components';
import getRoutes from './index';

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(history);

ReactDOM.render(
  <Root store={store} history={history} routes={routes} />,
  document.getElementById('content'),
);
