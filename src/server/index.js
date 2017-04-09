const extendRequire = require('isomorphic-loader/lib/extend-require');

extendRequire((err) => {
  if (err) {
    console.log(err);
  } else {
    require('./server');
  }
});
