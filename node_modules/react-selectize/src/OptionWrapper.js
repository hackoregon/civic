(function(){
  var ref$, createClass, div, isEqualToObject, cancelEvent;
  ref$ = require('react'), createClass = ref$.createClass, div = ref$.DOM.div;
  isEqualToObject = require('prelude-extension').isEqualToObject;
  cancelEvent = require('./utils').cancelEvent;
  module.exports = createClass({
    getDefaultProps: function(){
      return {};
    },
    render: function(){
      var this$ = this;
      return div({
        className: "option-wrapper " + (!!this.props.highlight ? 'highlight' : ''),
        onMouseDown: function(e){
          var listener;
          listener = function(e){
            this$.props.onClick(e);
            return window.removeEventListener('mouseup', listener);
          };
          window.addEventListener('mouseup', listener);
          return cancelEvent(e);
        },
        onMouseMove: this.props.onMouseMove,
        onMouseOut: this.props.onMouseOut,
        onMouseOver: this.props.onMouseOver
      }, this.props.renderItem(this.props.item));
    },
    shouldComponentUpdate: function(nextProps){
      var ref$, ref1$, ref2$;
      return !isEqualToObject(nextProps != null ? nextProps.uid : void 8, (ref$ = this.props) != null ? ref$.uid : void 8) || (nextProps != null ? nextProps.highlight : void 8) !== ((ref1$ = this.props) != null ? ref1$.highlight : void 8) || (nextProps != null ? nextProps.selectable : void 8) !== ((ref2$ = this.props) != null ? ref2$.selectable : void 8);
    }
  });
}).call(this);
