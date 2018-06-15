import React, { Component } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import './mapbox-gl.css';

const mapWrapper = css`
  margin: 0 auto;
  padding: 0 2.5%;
`;

const navControl = css`
  position: absolute;
  left: 0;
  z-index: 1;
`;

export default class BaseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport:{
        width: window.innerWidth * 0.95,
        height: 500,
        longitude: props.initialLongitude || -122.6765,
        latitude: props.initialLatitude || 45.5231,
        zoom: props.initialZoom || 9.5,
        minZoom: 6,
        maxZoom: 16,
        pitch: props.initialPitch || 0,
        bearing: 0,
      },
      tooltipInfo: null,
      x: null,
      y: null,
    };
    this.onViewportChange = this.onViewportChange.bind(this);
    this.resize = this.resize.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport},
    });
  }

  resize() {
    this.onViewportChange({
      width: window.innerWidth * 0.95,
      height: 500,
    });
  }

  onHover({object, x, y}) {
    this.setState({
      tooltipInfo: object,
      x,
      y,
    });
  }

  render() {
    const {
      viewport,
      tooltipInfo,
      x,
      y,
    } = this.state;

    const {
      mapboxStyle,
      mapboxToken,
      children,
    } = this.props;

    const childrenLayers = React.Children.map(children, child => {
      return React.cloneElement(child, {
        viewport,
        tooltipInfo,
        x,
        y,
        onHover: info => this.onHover(info),
      });
    });

    return (
      <div className={mapWrapper}>
        <MapGL
          className={'MapGL'}
          {...viewport}
          mapStyle={mapboxStyle}
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={viewport => this.onViewportChange(viewport)}
        >
          <div className={navControl}>
            <NavigationControl
              className={'NavigationControl'}
              onViewportChange={viewport => this.onViewportChange(viewport)}
            />
          </div>
          { childrenLayers }
        </MapGL>
      </div>
    );
  }
}

BaseMap.propTypes = {
  mapboxToken: PropTypes.string.isRequired,
  mapboxStyle: PropTypes.string,
  children: PropTypes.node,
};

BaseMap.defaultProps = {
  mapboxStyle: "mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq",
};
