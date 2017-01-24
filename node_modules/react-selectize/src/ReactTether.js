(function(){
  var createClass, ref$, render, unmountComponentAtNode, shallowCompare, Tether;
  createClass = require('react').createClass;
  ref$ = require('react-dom'), render = ref$.render, unmountComponentAtNode = ref$.unmountComponentAtNode;
  shallowCompare = require('react-addons-shallow-compare');
  Tether = require('tether');
  module.exports = createClass({
    getDefaultProps: function(){
      return {
        parentElement: function(){
          return document.body;
        }
      };
    },
    render: function(){
      return null;
    },
    initTether: function(props){
      var this$ = this;
      this.node = document.createElement('div');
      this.props.parentElement().appendChild(this.node);
      this.tether = new Tether(import$({
        element: this.node,
        target: props.target()
      }, props.options));
      render(props.children, this.node, function(){
        return this$.tether.position();
      });
    },
    destroyTether: function(){
      if (this.tether) {
        this.tether.destroy();
      }
      if (this.node) {
        unmountComponentAtNode(this.node);
        this.node.parentElement.removeChild(this.node);
      }
      this.node = this.tether = undefined;
    },
    componentDidMount: function(){
      if (this.props.children) {
        this.initTether(this.props);
      }
    },
    componentWillReceiveProps: function(newProps){
      var this$ = this;
      if (this.props.children && !newProps.children) {
        this.destroyTether();
      } else if (newProps.children && !this.props.children) {
        this.initTether(newProps);
      } else if (newProps.children) {
        this.tether.setOptions(import$({
          element: this.node,
          target: newProps.target()
        }, newProps.options));
        render(newProps.children, this.node, function(){
          return this$.tether.position();
        });
      }
    },
    shouldComponentUpdate: function(nextProps, nextState){
      return shallowCompare(this, nextProps, nextState);
    },
    componentWillUnmount: function(){
      this.destroyTether();
    }
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
