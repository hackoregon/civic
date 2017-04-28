import React, { Component, PropTypes } from 'react';
import L, { Map } from 'leaflet';
import '../../externals/leafletPattern';

L.CrossHatch = L.Pattern.extend({

  options: {
    weight: 1,
    color: 'white',
    opacity: 1.0,
    width: 10,
    height: 10,
  },

  _addShapes() {
    this._left = new L.PatternPath({
      stroke: true,
      weight: this.options.weight,
      color: this.options.color,
      opacity: this.options.opacity,
    });

    this._right = new L.PatternPath({
      stroke: true,
      weight: this.options.weight,
      color: this.options.color,
      opacity: this.options.opacity,
    });

    this.addShape(this._left);
    this.addShape(this._right);

    this._update();
  },

  _update() {
    this._left.options.d = `M0,0 l${this.options.width},${this.options.height}`;
    this._right.options.d = `M${this.options.width},0 l-${this.options.width},${this.options.height}`;
  },

  setStyle: L.Pattern.prototype.setStyle,
});

export const crossHatch = new L.CrossHatch({
  weight: 1,
  color: 'black',
  opacity: 1.0,
});

class CrossHatch extends Component {
  componentWillMount() {
    crossHatch.addTo(this.context.map);
  }

  render() {
    return <div>Taco</div>;
  }
}

CrossHatch.contextTypes = {
  map: PropTypes.instanceOf(Map),
};

export default CrossHatch;
