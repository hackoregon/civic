import React from 'react';
import { Route, Router } from 'react-router';

import { App } from './components/App';

const routes = history => (
  <Router history={history}>
    <Route path="/housing" component={App} />
  </Router>
);

export default routes;


//
// import createRoutes from '@hackoregon/civic-server/lib/router/createRoutes';
// import isClient from '@hackoregon/civic-server/lib/utils/isClient';
// import { getAsyncReducer } from './utils/asyncInjectors';

// if (typeof require.ensure !== 'function') { require.ensure = (d, c) => c(require); }

// function collectionRoute(store) {
//   const { injectAsyncReducer } = getAsyncReducer(store);
//   return {
//     path: 'collections/housing',
//     name: 'housing',
//     getComponent(nextState, cb) {
//       require.ensure([], (require) => {
//         injectAsyncReducer('parameters', require('./state/parameters').default);
//         injectAsyncReducer('affordability', require('./state/affordability').default);
//         injectAsyncReducer('neighborhoods', require('./state/neighborhoods').default);
//         injectAsyncReducer('rent', require('./state/rent').default);
//         injectAsyncReducer('households', require('./state/households').default);
//         injectAsyncReducer('populations', require('./state/populations').default);
//         cb(null, require('./components/App'));
//       });
//     },
//     getChildRoutes(location, cb) {
//       require.ensure([], (require) => {
//         const storyChild = {
//           path: '/:storyId',
//           getComponent(getChildLocation, getChildCb) {
//             getChildCb(null, require('./components/StoryPage'));
//           },
//         };
//
//         cb(null, [storyChild]);
//       });
//     },
//   };
// }
//
// function notFoundRoute() {
//   return {
//     path: isClient
//       ? '*'
//       : '.*',
//     name: 'notFound',
//     getComponent(location, cb) {
//       require.ensure([], (require) => {
//         cb(null, require('./components/NotFoundPage'));
//       });
//     },
//   };
// }
//
// export default createRoutes(collectionRoute, notFoundRoute);
