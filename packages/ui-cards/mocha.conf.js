/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = "test";

require("@babel/register")();

// chai syntax
const chai = require("chai");
// dom object in node
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

// stubbing/spying library
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

// enzyme configuration
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

// global setup
global.assert = chai.assert;
global.expect = chai.expect;
global.chai = chai;
global.sinon = sinon;

// dom setup
const { document } = new JSDOM(``, {
  url: "http://localhost"
}).window;
global.document = document;
global.navigator = {
  userAgent: "node.js"
};
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;

// we're going to emulate the dom with this part here
const exposedProperties = ["window", "navigator", "document"];
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

// chai setup
chai.use(sinonChai);
chai.use(require("chai-enzyme")());
