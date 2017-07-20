const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiImmutable = require('chai-immutable');
const enzyme = require('enzyme');

chai.use(sinonChai);
chai.use(chaiImmutable);

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
global.enzyme = enzyme;
