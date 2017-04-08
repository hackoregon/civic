import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import clientBootstrapper from '@hackoregon/civic-server/lib/utils/clientBootstrapper';

import getRoutes from '../routes';

const storeConfig = {
  initialState: window.INITIAL_REDUX_STATE,
};

const reactRootDomNode = document.getElementById('react-root');

function bootstrapCallback(err, Provider, renderProps) {
  ReactDOM.render((
    <Provider>
      <Router {...renderProps} />
    </Provider>
  ), reactRootDomNode);
}

clientBootstrapper({ storeConfig, getRoutes }, bootstrapCallback);
