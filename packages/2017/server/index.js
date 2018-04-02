const express = require('express');
const webpack = require('webpack');
const resolve = require('path').resolve;
const compression = require('compression');

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const outputPath = resolve(process.cwd(), isProd ? 'dist' : 'build');
const config = require('../webpack.config.js');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

if (isProd) {
  // Enable gzip compression and serve assets as they build when prod
  app.use(compression());
  webpack(config);
} else {
  // Start a webpack dev server with hot module reloading when dev
  const compiler = webpack(config);
  const middleware = devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(hotMiddleware(compiler));
}

// Respond with static files when they exist
app.use('/', express.static(outputPath));

// Redirect all other routes to index.html to let React handle routing client-side
app.get('/*', (req, res) => console.log('Servicing request for', req.url) || res.send(`
<!DOCTYPE html>
<html>
  <head>
    <title>Civic 2017 - A Hack Oregon Project</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8"/>
    <style>html, body { padding: 0; margin: 0; }</style>
  </head>
  <body style="margin:0">
    <div id="content"></div>
    <script type="text/javascript" src="/main.bundle.js"></script>
  </body>
</html>
`));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server up at http://localhost:${port}`);
