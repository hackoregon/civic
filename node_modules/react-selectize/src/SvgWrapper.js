(function(){
  var ref$, createClass, svg, findDOMNode;
  ref$ = require('react'), createClass = ref$.createClass, svg = ref$.DOM.svg;
  findDOMNode = require('react-dom').findDOMNode;
  module.exports = createClass({
    render: function(){
      return svg(this.props);
    },
    componentDidMount: function(){
      findDOMNode(this).setAttribute('focusable', false);
    }
  });
}).call(this);
