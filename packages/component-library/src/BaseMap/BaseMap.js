import React, { Component } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import Dimensions from 'react-dimensions';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import createRef from 'create-react-ref/lib/createRef';
import Geocoder from 'react-map-gl-geocoder';
import './mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFja29yZWdvbiIsImEiOiJjamk0MGZhc2cwNDl4M3FsdHAwaG54a3BnIn0.Fq1KA0IUwpeKQlFIoaEn_Q';

const mapWrapper = css`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 500px;
`;

const navControl = css`
  position: absolute;
  left: 0;
  z-index: 1;
`;

class BaseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport:{
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
      mounted: false,
    };
    this.onViewportChange = this.onViewportChange.bind(this);
    this.onHover = this.onHover.bind(this);
    this.mapRef = createRef();
  }

  onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport},
    });
  }

  onHover({object, x, y}) {
    this.setState({
      tooltipInfo: object,
      x,
      y,
    });
  }

  componentDidMount() { //Geocoder requires a ref to the map component
    this.setState({ mounted: true });
  }

  render() {
    const {
      viewport,
      tooltipInfo,
      x,
      y,
      mounted,
    } = this.state;

    viewport.width = this.props.containerWidth ? this.props.containerWidth : 500;
    viewport.height = 500;

    const {
      mapboxStyle,
      mapboxToken,
      geocoder,
      geocoderOptions,
      mapGLOptions,
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
          ref={this.mapRef}
          {...mapGLOptions}
        >
          <div className={navControl}>
            <NavigationControl
              className={'NavigationControl'}
              onViewportChange={viewport => this.onViewportChange(viewport)}
            />
          </div>
          { (geocoder && mounted) && <Geocoder mapRef={{ current: this.mapRef.current }} mapboxApiAccessToken={mapboxToken} options={{ ...geocoderOptions }} /> }
          { childrenLayers }
        </MapGL>
      </div>
    );
  }
}

BaseMap.propTypes = {
  mapboxToken: PropTypes.string.isRequired,
  mapboxStyle: PropTypes.string,
  geocoder: PropTypes.bool,
  geocoderOptions: PropTypes.object,
  mapGLOptions: PropTypes.object,
  children: PropTypes.node,
};

BaseMap.defaultProps = {
  mapboxStyle: "mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg",
  mapboxToken: "pk.eyJ1IjoiaGFja29yZWdvbiIsImEiOiJjamk0MGZhc2cwNDl4M3FsdHAwaG54a3BnIn0.Fq1KA0IUwpeKQlFIoaEn_Q",
  geocoder: false,
};
export default Dimensions()(BaseMap)
