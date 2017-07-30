const express = require('express');
// const { resolve } = require('path');
const fs = require('fs');
const path = require('path');
// const setupHousing = require('@hackoregon/civic-housing/server/middleware');
// const compression = require('compression');
const {defaultConfig, composeConfig} = require('@hackoregon/webpacker'); // eslint-disable-line
const app = express();

const port = 3001;

// app.use(compression());
app.use(express.static('./build'));

// const housingOpts = {
//   outputPath: resolve(process.cwd(), 'build/housing'),
//   publicPath: '/housing/',
// };

// setupHousing(app, housingOpts);
// app.use(housingOpts.publicPath, serveStatic(housingOpts.outputPath));

function staticHousing(req, res) {
  const housingPath = require.resolve('@hackoregon/civic-housing/dist/index.html');
  app.use('/housing', express.static(path.dirname(housingPath)));
  fs.readFile(housingPath, (err, file) => {
    if (err) {
      // console.log('ERROR ==>', err);
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
}

app.get('/collections/housing', staticHousing);
app.get('/', (req, res) => {
  res.json({ not: 'yet' });
});
// app.get('/housing/*', housing);
app.listen(port);
