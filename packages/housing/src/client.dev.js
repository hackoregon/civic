import '@hackoregon/component-library/src/global.styles.css';
/* eslint-disable */
import '!style-loader!css-loader!@hackoregon/component-library/assets/leaflet.css';
import '!style-loader!css-loader!@hackoregon/component-library/assets/react-select.min.css';
import { AppContainer } from 'react-hot-loader';
/* eslint-enable */
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './configureStore';
import AppPage from './components/App';
import createRoutes from './index';

const locationStateSelector = () => {
  let prevRoutingState;

  return (state) => {
    const routingState = state.routing;

    if (routingState !== prevRoutingState) {
      prevRoutingState = routingState;
    }

    return prevRoutingState;
  };
};

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: locationStateSelector(),
});

const routes = createRoutes(store);

const rootRoute = {
  component: AppPage,
  childRoutes: routes,
};

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={rootRoute} />
      </Provider>
    </AppContainer>,
    document.getElementById('content'),
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp();
  });
}
