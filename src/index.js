import createRoutes from '@hackoregon/civic-server/lib/router/createRoutes';
import { getAsyncReducer } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Page load failed', err); // eslint-disable-line no-console
};

const loadModule = cb => (componentModule) => {
  cb(null, componentModule.default);
};

function collectionRoute(store) {
  const { injectAsyncReducer } = getAsyncReducer(store);
  return {
    path: '/collection/housing',
    name: 'homepage',
    getComponent(nextState, cb) {
      const getModule = Promise.resolve(require.ensure([], (require) => {
        cb(null, require('./components/App'));
      }));

      const renderRoute = loadModule(cb);

      getModule
        .then((component) => {
          injectAsyncReducer('parameters', require('./state/parameters').default);
          injectAsyncReducer('affordability', require('./state/affordability').default);
          injectAsyncReducer('neighborhoods', require('./state/neighborhoods').default);
          injectAsyncReducer('rent', require('./state/rent').default);
          renderRoute(component);
        })
        .catch(errorLoading);
    },
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        const storyChild = {
          path: ':storyId',
          getComponent(getChildLocation, getChildCb) {
            getChildCb(null, require('./components/StoryPage'));
          },
        };

        cb(null, [storyChild]);
      }, 'story');
    },
  };
}

function notFoundRoute() {
  return {
    path: '*',
    name: 'notfoundpage',
    getComponent(nextState, cb) {
      const renderRoute = loadModule(cb);
      require.ensure([], require => Promise.resolve(require('./components/NotFoundPage'))
        .then(renderRoute)
        .catch(errorLoading),
      );
    },
  };
}

export default createRoutes(
  collectionRoute,
  notFoundRoute,
);
