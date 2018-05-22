import React, { PropTypes, Component } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import { css } from 'emotion';
import './mapbox-gl.css';

const mapWrapper = css`
  margin: 0 auto;
  padding: 0 2.5%;
`;

const navControl = css`
  position: absolute;
  right: 0;
  z-index: 9;
`;

export default class BaseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport:{
        width: window.innerWidth * 0.95,
        height: 500,
        longitude: -122.6765,
        latitude: 45.5231,
        zoom: 9.5,
        minZoom: 6,
        maxZoom: 16,
        pitch: 0,
        bearing: 0,
      },
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
      width: window.innerWidth * 0.95,
      height: 500,
    });
  }

  render() {
    const { viewport } = this.state;

    const {
      mapboxStyle,
      mapboxToken,
      children,
    } = this.props;

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
              onViewportChange={viewport => this.onViewportChange(viewport)}
            />
          </div>
          {
            children ?
            React.cloneElement(children, {
              viewport: viewport,
            }) :
            null
          }
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
