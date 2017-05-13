const express = require('express');
const { resolve, join } = require('path');
const fs = require('fs');
const setupHousing = require('@hackoregon/civic-housing/server/middleware');
const compression = require('compression');
const app = express();

const port = 3001;

app.use(compression());
app.use(express.static('./build'));

const housingOpts = {
  outputPath: resolve(process.cwd(), 'build/housing'),
  publicPath: '/housing/',
};

setupHousing(app, housingOpts);
// app.use(housingOpts.publicPath, serveStatic(housingOpts.outputPath));

function staticHousing(req, res) {
  app.use('/housing', express.static(housingOpts.outputPath));
  fs.readFile(join(housingOpts.outputPath, 'index.html'), (err, file) => {
    if (err) {
      console.log('ERROR ==>', err);
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
