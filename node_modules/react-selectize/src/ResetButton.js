(function(){
  var ref$, createClass, createFactory, path, SvgWrapper;
  ref$ = require('react'), createClass = ref$.createClass, createFactory = ref$.createFactory, path = ref$.DOM.path;
  SvgWrapper = createFactory(require('./SvgWrapper'));
  module.exports = createClass({
    render: function(){
      return SvgWrapper({
        className: 'react-selectize-reset-button',
        style: {
          width: 8,
          height: 8
        }
      }, path({
        d: "M0 0 L8 8 M8 0 L 0 8"
      }));
    }
  });
}).call(this);
