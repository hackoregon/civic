// chai syntax
const chai = require('chai');
// stubbing/spying library
const sinon = require('sinon');
// dom object in node
const jsdom = require('jsdom').jsdom;

// global setup
global.assert = chai.assert;
global.expect = chai.expect;
global.chai = chai;
global.sinon = sinon;

// dom setup
global.document = jsdom('');
global.navigator = {
  userAgent: 'node.js',
};
global.window = document.defaultView;

const exposedProperties = ['window', 'navigator', 'document'];
// we're going to emulate the dom with this part here
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

// ref setup
windowRef = window;
documentRef = document;

// chai setup
chai.use(sinonChai);
chai.use(require('chai-enzyme')());