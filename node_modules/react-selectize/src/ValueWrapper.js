(function(){
  var ref$, createClass, div, isEqualToObject;
  ref$ = require('react'), createClass = ref$.createClass, div = ref$.DOM.div;
  isEqualToObject = require('prelude-extension').isEqualToObject;
  module.exports = createClass({
    getDefaultProps: function(){
      return {};
    },
    render: function(){
      return div({
        className: 'value-wrapper'
      }, this.props.renderItem(this.props.item));
    },
    shouldComponentUpdate: function(nextProps){
      var ref$;
      return !isEqualToObject(nextProps != null ? nextProps.uid : void 8, (ref$ = this.props) != null ? ref$.uid : void 8);
    }
  });
}).call(this);
