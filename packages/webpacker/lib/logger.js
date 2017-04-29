'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logger;

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
function logger(msg) {
  var title = '' + msg.title.toUpperCase();
  var txt = '==> ' + title + ' -> ' + msg.body;
  var type = msg.type || 'info';

  if (msg.notify) {
    _nodeNotifier2.default.notify({
      title: title,
      message: msg.body
    });
  }

  switch (type) {
    case 'error':
      console.log(_safe2.default.red(txt));break;
    case 'warn':
      console.log(_safe2.default.yellow(txt));break;
    case 'info':
    default:
      console.log(_safe2.default.blue(txt));
  }
}