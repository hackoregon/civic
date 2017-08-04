'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _LeafletMapStyle = require('./LeafletMap.style.css');

var _LeafletMapStyle2 = _interopRequireDefault(_LeafletMapStyle);

var _neighborhoodGeoJson = require('./neighborhoodGeoJson.json');

var _neighborhoodGeoJson2 = _interopRequireDefault(_neighborhoodGeoJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind2.default.bind(_LeafletMapStyle2.default);
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

  return _react2.default.createElement(
    'div',
    { className: 'mainMap' },
    _react2.default.createElement(
      _reactLeaflet.Map,
      { className: className, center: position, zoom: zoom, zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false },
      _react2.default.createElement(_reactLeaflet.TileLayer, {
        url: url,
        attribution: attribute
      }),
      _react2.default.createElement(_reactLeaflet.GeoJSON, {
        data: _neighborhoodGeoJson2.default,
        onEachFeature: onEachFeature
      })
    )
  );
};

LeafletMap.displayName = 'LeafletMap';

LeafletMap.propTypes = {
  position: _react2.default.PropTypes.array,
  zoom: _react2.default.PropTypes.number,
  zoomControl: _react2.default.PropTypes.bool,
  dragging: _react2.default.PropTypes.bool,
  scrollWheelZoom: _react2.default.PropTypes.bool,
  doubleClickZoom: _react2.default.PropTypes.bool
};

exports.default = LeafletMap;