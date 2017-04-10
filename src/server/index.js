const extendRequire = require('isomorphic-loader/lib/extend-require');

extendRequire((err) => {
  if (err) {
    console.log('Error in isomorphic-loader', err); // eslint-disable-line
  } else {
    require('./server');
  }
});
