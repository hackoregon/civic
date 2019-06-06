/* Deprecated or needs refactored to work with Base Map */
/* eslint-disable */

import React from "react";
import mapboxgl from "mapbox-gl";
import { css } from "emotion";
import { string, number, array, object, oneOfType } from "prop-types";

const mapWrapper = css`
  margin: 0;
  width: 100%;
  height: 500px;
`;

class HeatMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const dataId = `data-source-${this.props.id}`;
    const heatmapId = `heat-layer-${this.props.id}`;
    const circleId = `circle-layer-${this.props.id}`;
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaGFja29yZWdvbiIsImEiOiJjamk0MGZhc2cwNDl4M3FsdHAwaG54a3BnIn0.Fq1KA0IUwpeKQlFIoaEn_Q";
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.props.mapStyle,
      center: [this.props.centerLongitude, this.props.centerLatitude],
      minZoom: 8.5,
      zoom: this.props.initialZoom,
      maxZoom: this.props.maxZoom
    });

    this.map.on("load", () => {
      this.map.addSource(dataId, {
        type: "geojson",
        data: this.props.data
      });

      this.map.addLayer(
        {
          id: heatmapId,
          type: "heatmap",
          source: dataId,
          paint: {
            "heatmap-weight": this.props.heatMapWeight,
            "heatmap-intensity": this.props.heatMapIntensity,
            "heatmap-color": this.props.heatMapColorScale,
            "heatmap-radius": this.props.heatMapRadius,
            "heatmap-opacity": this.props.heatMapOpacity
          }
        },
        "waterway-label"
      );

      this.map.addLayer(
        {
          id: circleId,
          type: "circle",
          source: dataId,
          paint: {
            "circle-radius": this.props.circleRadius,
            "circle-color": this.props.circleFillColor,
            "circle-stroke-color": this.props.circleStrokeColor,
            "circle-stroke-width": this.props.circleStrokeWidth,
            "circle-opacity": this.props.circleOpacity,
            "circle-stroke-opacity": this.props.circleStrokeOpacity
          }
        },
        "waterway-label"
      );

      this.map.addControl(new mapboxgl.NavigationControl());
    });
  }

  componentDidUpdate(prevProps) {
    const dataId = `data-source-${this.props.id}`;
    const heatmapId = `heat-layer-${this.props.id}`;
    const circleId = `circle-layer-${this.props.id}`;

    const propsFirstIssueDate = this.props.data.features[0].properties
      .issue_date;
    const prevPropsFirstIssueDate =
      prevProps.data.features[0].properties.issue_date;
    if (propsFirstIssueDate !== prevPropsFirstIssueDate) {
      this.map.getSource(dataId).setData(this.props.data);
    }

    if (this.props.circleStrokeColor !== prevProps.circleStrokeColor) {
      this.map.setPaintProperty(
        heatmapId,
        "heatmap-color",
        this.props.heatMapColorScale
      );
      this.map.setPaintProperty(
        circleId,
        "circle-color",
        this.props.circleFillColor
      );
      this.map.setPaintProperty(
        circleId,
        "circle-stroke-color",
        this.props.circleStrokeColor
      );
    }
  }

  render() {
    return <div className={mapWrapper} ref={el => (this.mapContainer = el)} />;
  }
}

HeatMap.propTypes = {
  data: object.isRequired,
  id: string.isRequired,
  centerLongitude: number,
  centerLatitude: number,
  initialZoom: number,
  maxZoom: number,
  mapStyle: string,
  heatMapWeight: array,
  heatMapIntensity: array,
  heatMapColorScale: array,
  heatMapRadius: oneOfType([array, number]),
  heatMapOpacity: oneOfType([array, number]),
  circleRadius: oneOfType([array, number]),
  circleOpacity: oneOfType([array, number]),
  circleFillColor: string,
  circleStrokeColor: string,
  circleStrokeWidth: number,
  circleStrokeOpacity: oneOfType([array, number])
};

HeatMap.defaultProps = {
  centerLongitude: 45.5597,
  centerLatitude: -122.7066,
  initialZoom: 9,
  maxZoom: 19,
  mapStyle: "mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg"
};

export default HeatMap;
