/* eslint-disable import/no-extraneous-dependencies */
// chai syntax
const chai  = require('chai');
// dom object in node
const jsdom = require('jsdom').jsdom;

// stubbing/spying library
const sinon     = require('sinon');
const sinonChai = require('sinon-chai');

// global setup
global.assert = chai.assert;
global.expect = chai.expect;
global.chai   = chai;
global.sinon  = sinon;

// dom setup
global.document  = jsdom('');
global.navigator = {
  userAgent: 'node.js',
};
global.window    = document.defaultView;

// we're going to emulate the dom with this part here
const exposedProperties = ['window', 'navigator', 'document'];
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

// chai setup
chai.use(sinonChai);
chai.use(require('chai-enzyme')());