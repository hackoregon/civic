'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _copyToClipboard = require('copy-to-clipboard');

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

var _StoryLink = require('./StoryLink');

var _StoryLink2 = _interopRequireDefault(_StoryLink);

var _styleConstants = require('../styleConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MS_TO_SWITCH_TEXT = 3000;
var StoryFooter = function (_Component) {
  _inherits(StoryFooter, _Component);

  function StoryFooter(props) {
    _classCallCheck(this, StoryFooter);

    var _this = _possibleConstructorReturn(this, (StoryFooter.__proto__ || Object.getPrototypeOf(StoryFooter)).call(this, props));

    _this.setToFalse = function () {
      return _this.setState({ copied: false });
    };

    _this.switchState = function (ms) {
      return setTimeout(_this.setToFalse, ms);
    };

    _this.handleCopy = function () {
      var _this$props = _this.props,
          collectionId = _this$props.collectionId,
          cardId = _this$props.cardId;

      (0, _copyToClipboard2.default)(window.location.origin + '/' + collectionId + '/' + cardId);
      _this.switchState(MS_TO_SWITCH_TEXT);
      _this.setState({ copied: true });
    };

    _this.state = {
      copied: false
    };
    return _this;
  }

  _createClass(StoryFooter, [{
    key: 'render',
    value: function render() {
      require('./StoryFooter.css');
      var _props = this.props,
          collectionId = _props.collectionId,
          cardId = _props.cardId;

      var shareTxt = this.state.copied ? 'Link copied!' : 'Share card';
      var shareIcon = this.state.copied ? _styleConstants.ICONS.check : _styleConstants.ICONS.link;
      return _react2.default.createElement(
        'div',
        { className: 'Actions' },
        _react2.default.createElement(
          _StoryLink2.default,
          { className: 'Context', route: '/' + collectionId + '/' + cardId, icon: _styleConstants.ICONS.eye },
          'View card'
        ),
        _react2.default.createElement(
          _StoryLink2.default,
          { className: 'Share', action: this.handleCopy, icon: shareIcon },
          shareTxt
        )
      );
    }
  }]);

  return StoryFooter;
}(_react.Component);

StoryFooter.defaultProps = {
  cardId: 'some-card-id',
  collectionId: 'some-collection-id'
};
StoryFooter.propTypes = {
  cardId: _react.PropTypes.string,
  collectionId: _react.PropTypes.string
};
exports.default = StoryFooter;