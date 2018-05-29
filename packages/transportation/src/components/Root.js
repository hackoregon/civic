import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import DevTools from './DevTools';

// removed <DevTools /> which was below Router
const Root = ({ store, routes, history }) => (
  <Provider store={store}>
    <div>
      <Router routes={routes} history={history} />

    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default Root;
