import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
// import DevTools from './DevTools';

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
