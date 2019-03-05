import { getAsyncReducer } from './utils/asyncInjectors';

const errorLoading = err => {
  console.error('Page load failed', err); // eslint-disable-line no-console
};

const loadModule = cb => componentModule => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  const { injectAsyncReducer } = getAsyncReducer(store);

  return [
    {
      path: '/',
      name: 'homepage',
      getComponent(nextState, cb) {
        const getModule = Promise.resolve(
          require.ensure([], require => {
            cb(null, require('./components/App'));
          })
        );

        const renderRoute = loadModule(cb);

        getModule
          .then(component => {
            injectAsyncReducer('app', require('./state/app').default);
            renderRoute(component);
          })
          .catch(errorLoading);
      },
    },
    {
      path: '/example',
      name: 'examplepage',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);
        require.ensure([], require =>
          Promise.resolve(require('./components/Example'))
            .then(renderRoute)
            .catch(errorLoading)
        );
      },
    },
    {
      path: '/budget101',
      name: 'examplepage',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);
        require.ensure([], require =>
          Promise.resolve(require('./components/Budget101'))
            .then(renderRoute)
            .catch(errorLoading)
        );
      },
    },
    {
      path: '/stacked',
      name: 'stackedareaepage',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);
        require.ensure([], require =>
          Promise.resolve(require('./components/StackedAreaChart'))
            .then(renderRoute)
            .catch(errorLoading)
        );
      },
    },
    {
      path: '/slider',
      name: 'mytestpage',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);
        require.ensure([], require =>
          Promise.resolve(require('./components/MyTest'))
            .then(renderRoute)
            .catch(errorLoading)
        );
      },
    },
    {
      path: '/collection',
      name: 'collectionpage',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);
        require.ensure([], require =>
          Promise.resolve(require('./components/CardCollection'))
            .then(renderRoute)
            .catch(errorLoading)
        );
      },
    },
    {
      path: '*',
      name: 'notfoundpage',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);
        require.ensure([], require =>
          Promise.resolve(require('./components/NotFoundPage'))
            .then(renderRoute)
            .catch(errorLoading)
        );
      },
    },
  ];
}
