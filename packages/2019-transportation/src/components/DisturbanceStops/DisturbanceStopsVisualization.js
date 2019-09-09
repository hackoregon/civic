import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { extent } from "d3-array";
import { BaseMap, ComparisonMap } from "@hackoregon/component-library";
import durationStringToSeconds from "../../utils/duration-parser";
import { DataContext } from "./index";

const infernoColorGradient = [
  0,
  "rgba(0,0,0,0)",
  0.2,
  "#420a68",
  0.4,
  "#932667",
  0.6,
  "#dd513a",
  0.8,
  "#fca50a",
  1,
  "#fcffa4"
];

const baseMapProps = {
  updateViewport: false,
  initialZoom: 14.5,
  initialLatitude: 45.512,
  initialLongitude: -122.659,
  mapboxDataId: "disturbance-stops-data",
  mapboxLayerType: "heatmap",
  // mapboxData: {}, // handled by the useEffect setup below,
  // mapboxLayerOptions: // handled by the heatmapLayerOptions for 2017 and 2018 below,
  mapboxLayerId: "disturbance-stops-map"
  // civicMapStyle:"dark",
  // navigation:false,
  // mapGLOptions: {
  //   scrollZoom: false,
  //   dragPan: false,
  //   dragRotate: false,
  //   doubleClickZoom: false,
  //   touchZoom: false,
  //   touchRotate: false,
  //   keyboard: false
  // },
};

const DisturbanceStopsVisualization = () => {
  const data = useContext(DataContext);
  const [disturbanceStops2017, setDisturbanceStops2017] = useState([]);
  const [disturbanceStops2018, setDisturbanceStops2018] = useState([]);

  const [disturbanceStops2017Extent, setDisturbanceStops2017Extent] = useState(
    []
  );
  const [disturbanceStops2018Extent, setDisturbanceStops2018Extent] = useState(
    []
  );

  const heatmapLayer2017 = {
    "heatmap-radius": 6,
    "heatmap-opacity": 0.9,
    "heatmap-intensity": 1,
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      ...infernoColorGradient
    ],
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["get", "duration"],
      disturbanceStops2017Extent.length ? disturbanceStops2017Extent[0] : 0, // lowest duration in the disturbance stop dataset
      0, // lowest value acts as a zero
      disturbanceStops2017Extent.length ? disturbanceStops2017Extent[1] : 1, // highest duration in the disturbance stop dataset
      1 // highest value acts as a one
    ]
  };

  const heatmapLayer2018 = {
    "heatmap-radius": 6,
    "heatmap-opacity": 0.9,
    "heatmap-intensity": 1,
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      ...infernoColorGradient
    ],
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["get", "duration"],
      disturbanceStops2018Extent.length ? disturbanceStops2018Extent[0] : 0, // lowest duration in the disturbance stop dataset
      0,
      disturbanceStops2018Extent.length ? disturbanceStops2018Extent[1] : 1, // highest duration in the disturbance stop dataset
      1
    ]
  };

  useEffect(() => {
    setDisturbanceStops2017([
      ...disturbanceStops2017,
      ...data.features.filter(feature => feature.properties.year === 2017)
    ]);
    setDisturbanceStops2018([
      ...disturbanceStops2018,
      ...data.features.filter(feature => feature.properties.year === 2018)
    ]);
  }, [data]); // eslint-disable-line

  useEffect(() => {
    setDisturbanceStops2017Extent(
      extent(disturbanceStops2017, d => {
        return durationStringToSeconds(d.properties.duration);
      })
    );
  }, [disturbanceStops2017]);

  useEffect(() => {
    setDisturbanceStops2018Extent(
      extent(disturbanceStops2018, d => {
        return durationStringToSeconds(d.properties.duration);
      })
    );
  }, [disturbanceStops2018]);

  const DisturbanceStopsMap2017 = disturbanceStops2017Extent.length ? (
    <BaseMap
      {...baseMapProps}
      civicMapStyle="light"
      mapboxData={{ type: "FeatureCollection", features: disturbanceStops2017 }}
      mapboxLayerOptions={heatmapLayer2017}
    />
  ) : null;
  const DisturbanceStopsMap2018 = disturbanceStops2018Extent.length ? (
    <BaseMap
      {...baseMapProps}
      civicMapStyle="dark"
      mapboxData={{ type: "FeatureCollection", features: disturbanceStops2018 }}
      mapboxLayerOptions={heatmapLayer2018}
    />
  ) : null;

  return data.loaded ? (
    <>
      <ComparisonMap
        leftMap={DisturbanceStopsMap2017}
        rightMap={DisturbanceStopsMap2018}
      />
    </>
  ) : null;
};

DisturbanceStopsVisualization.propTypes = {
  data: PropTypes.shape({ disturbanceStops: resourceShape })
};

export default DisturbanceStopsVisualization;
