// NOTE - because the routes are not resolved async we have to do this - routes need to be fixed
import '!style-loader!css-loader!@hackoregon/component-library/assets/global.styles.css';
import '!style-loader!css-loader!@hackoregon/component-library/assets/vendor/leaflet.css';
import '!style-loader!css-loader!@hackoregon/component-library/assets/vendor/react-select.min.css';

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
