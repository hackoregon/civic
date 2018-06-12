import React, { Component } from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import DeckGL, {HexagonLayer} from 'deck.gl';

const crosshair = css`
  cursor: crosshair;
`;

const mapWrapper = css`
  margin: auto;
  max-width: 900px;
`;

const colorScale = r => [r * 255, 140, 200 * (1 - r)];

const elevationScale = {min: 1, max: 50};

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

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  _animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this._stopAnimate();
    } else {
      this.setState({elevationScale: this.state.elevationScale + 1});
    }
  }

  render() {
    const {
      viewport,
      data,
      opacity,
      radius,
      elevation,
      colorRange,
      lightSettings,
      coverage,
      upperPercentile,
      tooltipInfo,
      x,
      y,
      onHover,
      onLayerHover,
      children,
    } = this.props;

    if (!data) {
      return null;
    }

    const tooltip = React.Children.map(children, child => {
      return React.cloneElement(child, {
        tooltipInfo: tooltipInfo,
        x: x,
        y: y,
      });
    });
    const tooltipRender = tooltipInfo ? tooltip : null;

    const layers = [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage: 1,
        data,
        elevationRange: [0, 3000],
        elevationScale: elevation,
        extruded: true,
        getPosition: d => d.geometry.coordinates,
        lightSettings,
        opacity,
        radius,
        upperPercentile: 100,
        pickable: true,
        onHover,
      })
    ];

    return (
      <div className={crosshair}>
        <DeckGL {...viewport} layers={layers} className={'HexOverlay'} >
          { tooltipRender }
        </DeckGL>
      </div>
    );
  }
}
export default HexOverlay;
