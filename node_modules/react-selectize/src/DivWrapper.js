(function(){
  var ref$, createClass, div;
  ref$ = require('react'), createClass = ref$.createClass, div = ref$.DOM.div;
  module.exports = createClass({
    getDefaultProps: function(){
      return {
        className: "",
        onHeightChange: function(){}
      };
    },
    render: function(){
      return div({
        className: this.props.className,
        ref: 'dropdown'
      }, this.props.children);
    },
    componentDidMount: function(){
      this.props.onHeightChange(this.refs.dropdown.offsetHeight);
    },
    componentDidUpdate: function(){
      this.props.onHeightChange(this.refs.dropdown.offsetHeight);
    },
    componentWillUnmount: function(){
      this.props.onHeightChange(0);
    }
  });
}).call(this);
