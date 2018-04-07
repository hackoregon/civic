const errorLoading = (err) => {
  console.error('Page load failed', err); // eslint-disable-line no-console
};

const loadModule = cb => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes() {
  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);
        require.ensure([], require => Promise.resolve(require('./components/CardCollection'))
        .then(renderRoute)
        .catch(errorLoading));
      },
    },
    {
      path: '*',
      name: 'notfoundpage',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);
        require.ensure([], require => Promise.resolve(require('./components/NotFoundPage'))
          .then(renderRoute)
          .catch(errorLoading),
        );
      },
    },
  ];
}
