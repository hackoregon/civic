const { join } = require('path');
const React = require('react');
const { webpackChecker } = require('@hackoregon/civic-server');

const logger = require('@hackoregon/civic-logger');

function htmlShell(serializedStore, innerHtml, { commons = {}, vendor = {}, app = {} }, Helmet) {
  const head = Helmet.rewind();
  const javascripts = `
    <script src="${commons.js}"></script>
    <script src="${vendor.js}"></script>
    <script src="${app.js}"></script>
  `;

  const headInnerHtml = `
    ${head.title ? head.title.toString() : ''}
    ${head.meta ? head.meta.toString() : ''}
    ${head.link ? head.link.toString() : ''}
    <script id="initial-state">window.INITIAL_REDUX_STATE=${serializedStore}</script>
  `;

  return (`
    <!doctype html>
    <html>
      <head>${headInnerHtml}</head>
      <body>
        <div id="react-root">
          <div>${innerHtml}</div>
        </div>
        ${javascripts}
      </body>
    </html>
  `);
}

function createcivicRenderer(civicPaths) {
  const { appRoot, appNodeModules } = civicPaths;
  // this is a little funky, but Helmet creates it's own internal side-effects, we'll need to ensure
  // our application has its own installation of Helmet
  let Helmet;
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    Helmet = require(join(appNodeModules, 'react-helmet'));
  } catch (e) {
    logger.error('cannot find needed dependency `react-helmet`, aborting process');
    process.exit(1);
  }

  return function civicArchetypeRenderer(
    req,
    { Provider, App },
    serializedStore,
    renderToString
  ) {
    return webpackChecker(join(appRoot, 'webpack-assets.json'))
      .then(function handleRender(assets) {
        try {
          const innerHtml = renderToString(
            React.createElement(
              Provider,
              null,
              React.createElement(App)
            )
          );

          return Promise.resolve(
            htmlShell(serializedStore, innerHtml, assets, Helmet)
          );
        } catch (e) {
          return Promise.reject(e);
        }
      });
  };
}

module.exports = createcivicRenderer;
