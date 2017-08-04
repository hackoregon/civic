import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import classNames from 'classnames/bind';
import styles from './LeafletMap.style.css';

import neighborhoodGeoJson from './neighborhoodGeoJson.json';

var cx = classNames.bind(styles);
var className = cx({ mapStyles: true });

var attribute = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

var LeafletMap = function LeafletMap(_ref) {
  var zoom = _ref.zoom,
      position = _ref.position,
      maxzoom = _ref.maxzoom;


  function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.NAME) {
      layer.bindPopup(feature.properties.NAME);
      layer.on('mouseover', function (e) {
        e.target.openPopup();
      });
    }
  }

  return React.createElement(
    'div',
    { className: 'mainMap' },
    React.createElement(
      Map,
      { className: className, center: position, zoom: zoom, zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false },
      React.createElement(TileLayer, {
        url: url,
        attribution: attribute
      }),
      React.createElement(GeoJSON, {
        data: neighborhoodGeoJson,
        onEachFeature: onEachFeature
      })
    )
  );
};

LeafletMap.displayName = 'LeafletMap';

LeafletMap.propTypes = {
  position: React.PropTypes.array,
  zoom: React.PropTypes.number,
  zoomControl: React.PropTypes.bool,
  dragging: React.PropTypes.bool,
  scrollWheelZoom: React.PropTypes.bool,
  doubleClickZoom: React.PropTypes.bool
};

export default LeafletMap;