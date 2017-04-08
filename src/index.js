import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import { Root } from './views';
import getRoutes from './routes.js';

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(history);

ReactDOM.render(
  <Root store={store} history={history} routes={routes} />,
  document.getElementById('root')
);


// import { getAsyncReducer } from './utils/asyncInjectors';
//
// const errorLoading = (err) => {
//   console.error('Page load failed', err); // eslint-disable-line no-console
// };
//
// const loadModule = cb => (componentModule) => {
//   cb(null, componentModule.default);
// };
//
// export default function createRoutes(store) {
//   const { injectAsyncReducer } = getAsyncReducer(store);
//
//   return [
//     {
//       path: '/',
//       name: 'homepage',
//       getComponent(nextState, cb) {
//         const getModule = Promise.resolve(require.ensure([], (require) => {
//           cb(null, require('./components/App'));
//         }));
//
//         const renderRoute = loadModule(cb);
//
//         getModule
//           .then((component) => {
//             injectAsyncReducer('app', require('./state/app').default);
//             renderRoute(component);
//           })
//           .catch(errorLoading);
//       },
//     },
//     {
//       path: '/example',
//       name: 'examplepage',
//       getComponent(nextState, cb) {
//         const renderRoute = loadModule(cb);
//         require.ensure([], require => Promise.resolve(require('./components/Example'))
//           .then(renderRoute)
//           .catch(errorLoading));
//       },
//     },
//     {
//       path: '*',
//       name: 'notfoundpage',
//       getComponent(nextState, cb) {
//         const renderRoute = loadModule(cb);
//         require.ensure([], require => Promise.resolve(require('./components/NotFoundPage'))
//           .then(renderRoute)
//           .catch(errorLoading),
//         );
//       },
//     },
//   ];
// }
