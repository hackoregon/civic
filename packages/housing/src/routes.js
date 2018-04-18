import { getAsyncReducer } from './utils/asyncInjectors';

if (typeof require.ensure !== 'function') { require.ensure = (d, c) => c(require); }

function createRoutes(...routes) {
  return function createRoutesWithStore(store) {
    return [...routes].map(route => typeof route === 'function' ? route(store) : route);
  };
}

function collectionRoute(store) {
  const { injectAsyncReducer } = getAsyncReducer(store);
  return {
    path: 'housing',
    name: 'housing',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        injectAsyncReducer('parameters', require('./state/parameters').default);
        injectAsyncReducer('affordability', require('./state/affordability').default);
        injectAsyncReducer('neighborhoods', require('./state/neighborhoods').default);
        injectAsyncReducer('rent', require('./state/rent').default);
        injectAsyncReducer('households', require('./state/households').default);
        injectAsyncReducer('populations', require('./state/populations').default);
        cb(null, require('./components/App'));
      });
    },
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        const storyChild = {
          path: '/:storyId',
          getComponent(getChildLocation, getChildCb) {
            getChildCb(null, require('./components/StoryPage'));
          },
        };

        cb(null, [storyChild]);
      });
    },
  };
}

function notFoundRoute() {
  return {
    path: '.*',
    name: 'notFound',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/NotFoundPage'));
      });
    },
  };
}

export default createRoutes(collectionRoute, notFoundRoute);
