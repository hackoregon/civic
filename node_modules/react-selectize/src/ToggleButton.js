(function(){
  var ref$, createClass, createFactory, path, SvgWrapper;
  ref$ = require('react'), createClass = ref$.createClass, createFactory = ref$.createFactory, path = ref$.DOM.path;
  SvgWrapper = createFactory(require('./SvgWrapper'));
  module.exports = createClass({
    getDefaultProps: function(){
      return {
        open: false,
        flipped: false
      };
    },
    render: function(){
      return SvgWrapper({
        className: 'react-selectize-toggle-button',
        style: {
          width: 10,
          height: 8
        }
      }, path({
        d: (function(){
          switch (false) {
          case !((this.props.open && !this.props.flipped) || (!this.props.open && this.props.flipped)):
            return "M0 6 L5 1 L10 6 Z";
          default:
            return "M0 1 L5 6 L10 1 Z";
          }
        }.call(this))
      }));
    }
  });
}).call(this);
