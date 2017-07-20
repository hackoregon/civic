module.exports = function civicStartupMessage(portNumber, appName) {
  const finalAppName = appName || 'civic';
  /* eslint-disable */
  return (`
    ☆  ${finalAppName}  ☆
    App running at http://localhost:${portNumber}
`
/* eslint-enable */
  );
};
