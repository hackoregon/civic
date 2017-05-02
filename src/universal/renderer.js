import React from 'react';
import path from 'path';
import Helmet from 'react-helmet';
// import fs from 'fs';
import checkForClient from '@hackoregon/civic-server/lib/utils/checkForClient';

const ROOT = process.cwd();
// const pathToCss = require.resolve('@hackoregon/component-library/lib/global.styles.css');
// const pathToCss = require.resolve('./ssrCSS.css');
//
// function ssrCSS(p) {
//   try {
//     const cssForHead = fs.readFileSync(p).toString();
//     return `<style>${cssForHead}</style>`;
//   } catch (err) {
//     return '';
//   }
// }

const staticServerAddr = 'http://civicpdx.org:8080/public';
const makeScript = js => `<script src="${staticServerAddr}/${js}"></script>`;
const makeLink = css => `<link rel="stylesheet" href="${staticServerAddr}/${css}">`;

function htmlShell(serializedStore, innerHtml, assets) {
  // console.log(vendor, app, main);

  // const hideUnstyledContent = ssrCSS(pathToCss);

  const head = Helmet.rewind();

  const javascripts = `
    ${makeScript(assets.chunks.app[0])}
  `;
  const csses = `
    ${makeLink(assets.chunks.app[2])}
    ${makeLink(assets.chunks.app[1])}
    ${makeLink(assets.chunks.app[3])}
  `;

  const headInnerHtml = `
    ${head.title ? head.title.toString() : ''}
    ${head.meta ? head.meta.toString() : ''}
    ${head.link ? head.link.toString() : ''}
    ${csses}
    <script src="https://use.fontawesome.com/031ebbe0c7.js"></script>
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

export default function reactRenderer(req, { Provider, App }, serializedStore, renderToString) {
  return checkForClient(path.join(ROOT, 'build/public/isomorphic-assets.json'))
    .then((assets) => {
      try {
        const innerHtml = renderToString(
          <Provider>
            <App />
          </Provider>,
        );

        return Promise.resolve(
          htmlShell(serializedStore, innerHtml, assets),
        );
      } catch (e) {
        return Promise.reject(e);
      }
    });
}
