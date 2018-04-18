var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  padding: 24px;\n  display: flex;\n  justify-content: center;\n\n  & > div:first-child {\n    margin-right: 32px;\n  }\n'], ['\n  padding: 24px;\n  display: flex;\n  justify-content: center;\n\n  & > div:first-child {\n    margin-right: 32px;\n  }\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component, PropTypes } from 'react';
import copy from 'copy-to-clipboard';
import { css } from 'emotion';
import StoryLink from './StoryLink';
import { ICONS } from '../styleConstants';

var MS_TO_SWITCH_TEXT = 3000;

var actionsClass = css(_templateObject);

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

      copy(window.location.origin + '/' + collectionId + '/' + cardId);
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
      var _props = this.props,
          collectionId = _props.collectionId,
          cardId = _props.cardId;

      var shareTxt = this.state.copied ? 'Link copied!' : 'Share card';
      var shareIcon = this.state.copied ? ICONS.check : ICONS.link;
      return React.createElement(
        'div',
        { className: actionsClass },
        React.createElement(
          StoryLink,
          { className: 'Context', route: '/' + collectionId + '/' + cardId, icon: ICONS.eye },
          'View card'
        ),
        React.createElement(
          StoryLink,
          { className: 'Share', action: this.handleCopy, icon: shareIcon },
          shareTxt
        )
      );
    }
  }]);

  return StoryFooter;
}(Component);

StoryFooter.defaultProps = {
  cardId: 'some-card-id',
  collectionId: 'some-collection-id'
};
StoryFooter.propTypes = {
  cardId: PropTypes.string,
  collectionId: PropTypes.string
};
export default StoryFooter;