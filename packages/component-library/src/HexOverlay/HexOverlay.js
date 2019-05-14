/* Deprecated or needs refactored to work with Base Map */
/* eslint-disable */

import React, { Component } from "react";
import PropTypes from "prop-types";
import DeckGL, { HexagonLayer } from "deck.gl";
import window from "global/window";

const elevationScale = { min: 1, max: 50 };

class HexOverlay extends Component {
  constructor(props) {
    super(props);
    this.startAnimationTimer = null;
    this.intervalTimer = null;
    this.state = {
      elevationScale: elevationScale.min
    };

    this._startAnimate = this._startAnimate.bind(this);
    this._animateHeight = this._animateHeight.bind(this);
  }

  componentDidMount() {
    this._animate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.props.data.length) {
      this._animate();
    }
  }

  componentWillUnmount() {
    this._stopAnimate();
  }

  _animate() {
    this._stopAnimate();

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
  }

  _animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this._stopAnimate();
    } else {
      this.setState({ elevationScale: this.state.elevationScale + 1 });
    }
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  render() {
    const {
      viewport,
      data,
      opacity,
      radius,
      coverage,
      elevation,
      colorRange,
      filled,
      wireframe,
      lightSettings,
      upperPercentile,
      tooltipInfo,
      x,
      y,
      onHover,
      onLayerHover,
      children
    } = this.props;

    if (!data) {
      return null;
    }

    const tooltip = React.Children.map(children, child => {
      return React.cloneElement(child, {
        tooltipInfo,
        x,
        y
      });
    });

    const tooltipRender = tooltipInfo && x && y ? tooltip : null;

    const layers = [
      new HexagonLayer({
        data,
        colorRange,
        lightSettings,
        opacity,
        onHover,
        radius,
        coverage,
        filled,
        wireframe,
        id: "heatmap",
        elevationRange: [0, 3000],
        elevationScale: elevation,
        extruded: true,
        pickable: true,
        upperPercentile: 100,
        getPosition: d => d.geometry.coordinates
      })
    ];

    return (
      <div>
        <DeckGL
          {...viewport}
          layers={layers}
          className="HexOverlay"
          getCursor={() => "crosshair"}
        />
        {tooltipRender}
      </div>
    );
  }
}
export default HexOverlay;
