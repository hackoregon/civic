import '@hackoregon/component-library/assets/global.styles.css';
/* eslint-disable */
import '!style-loader!css-loader!@hackoregon/component-library/assets/vendor/leaflet.css';
import '!style-loader!css-loader!@hackoregon/component-library/assets/vendor/react-select.min.css';
import { AppContainer } from 'react-hot-loader';
/* eslint-enable */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './configureStore';

import getRoutes from './index';


const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(history);

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('content'),
);
