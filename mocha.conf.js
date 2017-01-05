/* eslint-disable */
const chai = require('chai');
const sinon = require('sinon');

global.navigator = {
  userAgent: 'node.js'
};
global.assert = chai.assert;
global.expect = chai.expect;
global.chai   = chai;
global.sinon  = sinon;
