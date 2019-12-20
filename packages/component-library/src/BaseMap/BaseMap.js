/* eslint-disable no-nested-ternary */
import { Component, Children, cloneElement } from "react";
import MapGL, {
  NavigationControl,
  Marker,
  FlyToInterpolator
} from "react-map-gl";
import Dimensions from "react-dimensions";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import createRef from "create-react-ref/lib/createRef";
import Geocoder from "react-map-gl-geocoder";
import { isEqual } from "lodash";
import bbox from "@turf/bbox";
import WebMercatorViewport from "viewport-mercator-project";
import mapboxgl from "./mapboxgl";
import "mapbox-gl/dist/mapbox-gl.css";

import { MapGLResources } from "../_Themes/index";

const {
  MAPBOX_TOKEN,
  CIVIC_LIGHT,
  CIVIC_DARK,
  CIVIC_PENCIL,
  DISASTER_GAME,
  SANDBOX_DARK
} = MapGLResources;

const mapWrapper = css`
  position: relative;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const navControl = css`
  position: absolute;
  left: 0;
  z-index: 1;
`;

const geoCoderWrapper = css`
  position: absolute;
  margin: 5px 25px 35px 45px;
`;

const topRight = css`
  top: 0;
  right: 0;
`;

const topLeft = css`
  top: 0;
  left: 0;
`;

const bottomLeft = css`
  bottom: 0;
  left: 0;
`;

const bottomRight = css`
  bottom: 0;
  right: 0;
`;

class BaseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: props.initialLongitude,
        latitude: props.initialLatitude,
        zoom: props.initialZoom,
        minZoom: props.minZoom,
        maxZoom: props.maxZoom,
        pitch: props.initialPitch,
        bearing: 0
      },
      tooltipInfo: null,
      x: null,
      y: null,
      mounted: false
    };
    this.mapRef = createRef();
    this.geocoderContainerRef = createRef();
  }

  componentDidMount() {
    // Geocoder requires a ref to the map component
    this.setState({ mounted: true });
    const { bboxData, bboxPadding, boundBox } = this.props;
    const { viewport } = this.state;

    if (bboxData.length > 0) {
      const toGeoJSON = {
        type: "FeatureCollection",
        features: [...bboxData]
      };
      const boundingBox = bbox(toGeoJSON);
      const bboxViewport = new WebMercatorViewport({
        width: viewport.width,
        height: viewport.height
      }).fitBounds(
        [[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]],
        {
          padding: bboxPadding
        }
      );
      this.onViewportChange(bboxViewport);
    }

    if (boundBox.length === 4) {
      const bboxViewport = new WebMercatorViewport({
        width: viewport.width,
        height: viewport.height
      }).fitBounds([[boundBox[0], boundBox[1]], [boundBox[2], boundBox[3]]], {
        padding: bboxPadding
      });
      this.onViewportChange(bboxViewport);
    }
  }

  componentWillReceiveProps(props) {
    const { updateViewport } = props;
    if (updateViewport) {
      const updatedViewportProps = {
        zoom: props.initialZoom,
        pitch: props.initialPitch,
        longitude: props.initialLongitude,
        latitude: props.initialLatitude
      };

      // Remove all keys that have null/undefined values to keep defaults
      Object.keys(updatedViewportProps).forEach(key => {
        if (updatedViewportProps[key] == null) {
          delete updatedViewportProps[key];
        }
      });

      this.setState(prevState => ({
        viewport: { ...prevState.viewport, ...updatedViewportProps }
      }));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      mapboxData: prevMapboxData,
      mapboxLayerOptions: prevMapboxLayerOptions,
      boundBox: prevBoundBox
    } = prevProps;
    const {
      mapboxData,
      mapboxDataId,
      mapboxLayerOptions,
      mapboxLayerId,
      bboxData,
      bboxPadding,
      boundBox
    } = this.props;

    const { viewport } = this.state;

    if (!isEqual(prevMapboxData, mapboxData)) {
      const map = this.mapRef.current.getMap();
      map.getSource(mapboxDataId).setData(mapboxData);
    }

    if (!isEqual(prevMapboxLayerOptions, mapboxLayerOptions)) {
      const map = this.mapRef.current.getMap();
      const updatedProperties = Object.keys(mapboxLayerOptions).filter(
        m => !isEqual(prevMapboxLayerOptions[m], mapboxLayerOptions[m])
      );
      updatedProperties.forEach(p =>
        map.setPaintProperty(mapboxLayerId, p, mapboxLayerOptions[p])
      );
    }

    if (bboxData.length > 0 && !isEqual(prevProps.bboxData, bboxData)) {
      const toGeoJSON = {
        type: "FeatureCollection",
        features: [...bboxData]
      };
      const boundingbox = bbox(toGeoJSON);
      const bboxViewport = new WebMercatorViewport({
        width: viewport.width,
        height: viewport.height
      }).fitBounds(
        [[boundingbox[0], boundingbox[1]], [boundingbox[2], boundingbox[3]]],
        {
          padding: bboxPadding
        }
      );
      this.onViewportChange(bboxViewport);
    }

    if (boundBox.length === 4 && !isEqual(prevBoundBox, boundBox)) {
      const bboxViewport = new WebMercatorViewport({
        width: viewport.width,
        height: viewport.height
      }).fitBounds([[boundBox[0], boundBox[1]], [boundBox[2], boundBox[3]]], {
        padding: bboxPadding
      });
      this.onViewportChange(bboxViewport);
    }
  }

  onHover = ({ object, x, y }) => {
    this.setState({
      tooltipInfo: object,
      x,
      y
    });
  };

  onViewportChange = viewport => {
    const { minZoom, maxZoom } = this.props;
    const { zoom } = viewport;
    if (zoom >= minZoom && zoom <= maxZoom) {
      this.setState(prevState => ({
        viewport: {
          ...prevState.viewport,
          ...viewport
        }
      }));
    } else if (zoom < minZoom) {
      this.setState(prevState => ({
        viewport: {
          ...prevState.viewport,
          zoom: minZoom
        }
      }));
    } else if (zoom > maxZoom) {
      this.setState(prevState => ({
        viewport: {
          ...prevState.viewport,
          zoom: maxZoom
        }
      }));
    }
  };

  render() {
    const { viewport, tooltipInfo, x, y, mounted } = this.state;
    const {
      height,
      containerHeight,
      containerWidth,
      civicMapStyle,
      mapboxToken,
      navigation,
      geocoder,
      locationMarker,
      geocoderOptions,
      geocoderOnChange,
      geocoderPosition,
      mapGLOptions,
      children,
      useContainerHeight,
      onBaseMapClick,
      onBaseMapHover,
      onBaseMapMouseOut,
      mapboxData,
      mapboxDataId,
      mapboxLayerType,
      mapboxLayerOptions,
      mapboxLayerId,
      locationMarkerCoord,
      animate,
      animationDuration,
      scaleBar,
      scaleBarOptions,
      sharedViewport,
      onSharedViewportChange,
      useScrollZoom,
      useFitBounds,
      bboxData
    } = this.props;

    viewport.width = containerWidth || 500;
    viewport.height = useContainerHeight ? containerHeight : height;

    const childrenLayers = Children.map(children, child => {
      const layerViewport = sharedViewport
        ? { ...viewport, ...sharedViewport }
        : viewport;
      return cloneElement(child, {
        viewport: layerViewport,
        tooltipInfo,
        x,
        y,
        onHover: info => this.onHover(info)
      });
    });

    const onMapLoad = () => {
      const map = this.mapRef.current.getMap();

      if (scaleBar) {
        map.addControl(
          new mapboxgl.ScaleControl({
            maxWidth: scaleBarOptions.maxWidth,
            unit: scaleBarOptions.units
          })
        );
      }

      if (!mapboxData || !mapboxLayerType || !mapboxLayerOptions) return;
      map.addSource(mapboxDataId, {
        type: "geojson",
        data: mapboxData
      });
      map.addLayer(
        {
          id: mapboxLayerId,
          type: mapboxLayerType,
          source: mapboxDataId,
          paint: mapboxLayerOptions
        },
        "waterway-label"
      );
    };

    let baseMapboxStyleURL = CIVIC_LIGHT;
    if (civicMapStyle === "dark") {
      baseMapboxStyleURL = CIVIC_DARK;
    } else if (civicMapStyle === "pencil") {
      baseMapboxStyleURL = CIVIC_PENCIL;
    } else if (civicMapStyle === "disaster-game") {
      baseMapboxStyleURL = DISASTER_GAME;
    } else if (civicMapStyle === "sandbox-dark") {
      baseMapboxStyleURL = SANDBOX_DARK;
    }

    const animationProps = !animate
      ? {}
      : {
          transitionDuration: animationDuration,
          transitionInterpolator: new FlyToInterpolator()
        };

    let boundingbox;
    if (useFitBounds && bboxData.length > 0) {
      const toGeoJSON = {
        type: "FeatureCollection",
        features: [...bboxData]
      };
      boundingbox = bbox(toGeoJSON);
    }

    const finalViewport = sharedViewport
      ? {
          ...viewport,
          ...sharedViewport,
          height,
          width: containerWidth
        }
      : viewport;

    const geocoderPositions = {
      "top-left": topLeft,
      "top-right": topRight,
      "bottom-left": bottomLeft,
      "bottom-right": bottomRight
    };

    return (
      <div css={mapWrapper}>
        <div
          ref={this.geocoderContainerRef}
          css={[geoCoderWrapper, geocoderPositions[geocoderPosition]]}
        />
        <MapGL
          className="MapGL"
          {...finalViewport}
          {...animationProps}
          mapStyle={baseMapboxStyleURL}
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={newViewport => {
            if (onSharedViewportChange) {
              onSharedViewportChange(newViewport);
            } else {
              this.onViewportChange(newViewport);
            }
          }}
          ref={this.mapRef}
          {...mapGLOptions}
          onClick={onBaseMapClick}
          onHover={baseInfo => {
            const baseMapboxRef = this.mapRef.current.getMap();
            if (onBaseMapHover) {
              onBaseMapHover(baseInfo, baseMapboxRef);
            }
          }}
          onMouseOut={() => {
            const baseMapboxRef = this.mapRef.current.getMap();
            if (onBaseMapMouseOut) {
              onBaseMapMouseOut(baseMapboxRef);
            }
          }}
          onBlur={() => {
            const baseMapboxRef = this.mapRef.current.getMap();
            if (onBaseMapMouseOut) {
              onBaseMapMouseOut(baseMapboxRef);
            }
          }}
          onLoad={onMapLoad}
          scrollZoom={useScrollZoom}
        >
          <div css={navControl}>{navigation && <NavigationControl />}</div>
          {locationMarker && (
            <Marker
              latitude={locationMarkerCoord.latitude}
              longitude={locationMarkerCoord.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <span role="img" aria-label="star">
                ❌
              </span>
            </Marker>
          )}
          {geocoder && mounted && (
            <Geocoder
              mapRef={{ current: this.mapRef.current }}
              containerRef={this.geocoderContainerRef}
              mapboxApiAccessToken={mapboxToken}
              onViewportChange={newViewport => {
                this.onViewportChange(newViewport);
                // eslint-disable-next-line no-unused-expressions
                !!geocoderOnChange && geocoderOnChange(newViewport);
              }}
              bbox={boundingbox}
              position={geocoderPosition}
              options={{ ...geocoderOptions }}
            />
          )}
          {childrenLayers}
        </MapGL>
      </div>
    );
  }
}

BaseMap.propTypes = {
  initialLongitude: PropTypes.number,
  initialLatitude: PropTypes.number,
  initialZoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  initialPitch: PropTypes.number,
  height: PropTypes.number,
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  mapboxToken: PropTypes.string,
  civicMapStyle: PropTypes.oneOf([
    "light",
    "dark",
    "pencil",
    "disaster-game",
    "sandbox-dark"
  ]),
  navigation: PropTypes.bool,
  locationMarker: PropTypes.bool,
  locationMarkerCoord: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }),
  geocoder: PropTypes.bool,
  geocoderOptions: PropTypes.shape({}),
  geocoderOnChange: PropTypes.func,
  geocoderPosition: PropTypes.oneOf([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right"
  ]),
  mapGLOptions: PropTypes.shape({}),
  children: PropTypes.node,
  useContainerHeight: PropTypes.bool,
  updateViewport: PropTypes.bool,
  animate: PropTypes.bool,
  animationDuration: PropTypes.number,
  onBaseMapClick: PropTypes.func,
  onBaseMapHover: PropTypes.func,
  onBaseMapMouseOut: PropTypes.func,
  mapboxDataId: PropTypes.string,
  mapboxData: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  mapboxLayerType: PropTypes.string,
  mapboxLayerId: PropTypes.string,
  mapboxLayerOptions: PropTypes.shape({}),
  scaleBar: PropTypes.bool,
  scaleBarOptions: PropTypes.shape({
    maxWidth: PropTypes.number,
    units: PropTypes.string
  }),
  sharedViewport: PropTypes.shape({}),
  onSharedViewportChange: PropTypes.func,
  bboxData: PropTypes.arrayOf(PropTypes.shape({})),
  bboxPadding: PropTypes.number,
  boundBox: PropTypes.arrayOf(PropTypes.number),
  useScrollZoom: PropTypes.bool,
  useFitBounds: PropTypes.bool
};

BaseMap.defaultProps = {
  mapboxToken: MAPBOX_TOKEN,
  navigation: true,
  geocoder: false,
  geocoderPosition: "top-right",
  useContainerHeight: false,
  updateViewport: true,
  animate: false,
  initialLongitude: -122.6765,
  initialLatitude: 45.5231,
  initialZoom: 9.5,
  minZoom: 6,
  maxZoom: 20,
  initialPitch: 0,
  height: 500,
  locationMarkerCoord: {
    latitude: 0,
    longitude: 0
  },
  animationDuration: 1000,
  scaleBar: false,
  bboxData: [],
  bboxPadding: 10,
  boundBox: [],
  useScrollZoom: false
};

export default Dimensions()(BaseMap);
