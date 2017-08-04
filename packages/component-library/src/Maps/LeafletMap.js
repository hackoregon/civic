import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import classNames from 'classnames/bind';
import styles from './LeafletMap.style.css';
// data from http://gis-pdx.opendata.arcgis.com/datasets/neighborhoods-regions/data
import neighborhoodGeoJson from './neighborhoodGeoJson.json';

const cx = classNames.bind(styles);
const className = cx({ mapStyles: true });

const attribute = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

const LeafletMap = ({ zoom, position, maxzoom }) => {
  // require('../../assets/leaflet.css');

  function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.NAME) {
      layer.bindPopup(feature.properties.NAME);
      layer.on('mouseover', (e) => {
        e.target.openPopup();
      });
    }
  }

  return (
    <div className={'mainMap'}>
      <Map className={className} center={position} zoom={zoom} zoomControl={false} dragging={false} scrollWheelZoom={false} doubleClickZoom={false} >
        <TileLayer
          url={url}
          attribution={attribute}
        />
        <GeoJSON
          data={neighborhoodGeoJson}
          onEachFeature={onEachFeature}
        />
      </Map>
    </div>
  );
};

LeafletMap.displayName = 'LeafletMap';

LeafletMap.propTypes = {
  position: React.PropTypes.array,
  zoom: React.PropTypes.number,
  zoomControl: React.PropTypes.bool,
  dragging: React.PropTypes.bool,
  scrollWheelZoom: React.PropTypes.bool,
  doubleClickZoom: React.PropTypes.bool,
};


export default LeafletMap;