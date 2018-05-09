import React, { PropTypes, Component } from 'react';
import MapGL from 'react-map-gl';
import { css } from 'emotion';
import './mapbox-gl.css';

const mapWrapper = css`
  margin: auto;
  max-width: 900px;
`;

export default class BaseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport:{
        width: window.innerWidth > 900 ? 898 : window.innerWidth,
        height: 400,
        longitude: -122.6765,
        latitude: 45.5231,
        zoom: 10,
        minZoom: 1,
        maxZoom: 20,
        pitch: 0,
        bearing: 0,
      }
    };
    this.onViewportChange = this.onViewportChange.bind(this);
    this.resize = this.resize.bind(this);
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
      width: window.innerWidth > 900 ? 898 : window.innerWidth,
      height: 450,
    });
  }

  render() {
    const { viewport } = this.state;

    const {
      mapboxStyle,
      mapboxToken,
    } = this.props;

    return (
      <div className={mapWrapper}>
        <MapGL
          {...viewport}
          mapStyle={mapboxStyle}
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={ viewport => this.onViewportChange(viewport)}
        />
      </div>
    );
  };
};

BaseMap.propTypes = {
  mapboxStyle: PropTypes.string,
  mapboxToken: PropTypes.string.isRequired,
};

BaseMap.defaultProps = {
  mapboxStyle: "mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq",
};