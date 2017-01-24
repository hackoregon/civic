(function(){
  var React, createClass, ref$, div, span, map;
  React = require('react'), createClass = React.createClass, ref$ = React.DOM, div = ref$.div, span = ref$.span;
  map = require('prelude-ls').map;
  module.exports = createClass({
    getDefaultProps: function(){
      return {
        partitions: [],
        text: "",
        style: {},
        highlightStyle: {}
      };
    },
    render: function(){
      var this$ = this;
      return div({
        className: 'highlighted-text',
        style: this.props.style
      }, map(function(arg$){
        var start, end, highlight;
        start = arg$[0], end = arg$[1], highlight = arg$[2];
        return span({
          key: this$.props.text + "" + start + end + highlight,
          className: highlight ? 'highlight' : '',
          style: highlight
            ? this$.props.highlightStyle
            : {}
        }, this$.props.text.substring(start, end));
      })(
      this.props.partitions));
    }
  });
}).call(this);
