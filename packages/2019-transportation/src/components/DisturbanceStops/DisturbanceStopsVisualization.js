import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
// import { isLoaded } from "reduxful";
import { extent } from "d3-array";
import { BaseMap, ComparisonMap } from "@hackoregon/component-library";

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

// http://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=100&offset=400&months=9&time_range=6.25%2C9.5&years=2017%2C2018&lines=6%2C10%2C14&service_key=W&bounds=-122.665849%2C45.510867%2C-122.653650%2C45.514367
const limit = 2000;
const offset = 0;
const months = "9,10,11";
const timeRange = "6.25,9.5";
const years = "2017,2018";
const lines = "6,10,14";
const bounds = "-122.665849,45.510867,-122.653650,45.514367";
const testUrl = `http://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=${limit}&offset=${offset}&months=${months}&time_range=${timeRange}&years=${years}&lines=${lines}&service_key=W&bounds=${bounds}`;

const DisturbanceStopsVisualization = () => {
  const [loaded, setLoaded] = useState(false);
  const [requestUrl, setRequestUrl] = useState(testUrl);

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
      0,
      disturbanceStops2017Extent.length ? disturbanceStops2017Extent[1] : 1, // highest duration in the disturbance stop dataset
      1
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
      0, // disturbanceStops2018Extent.length ? disturbanceStops2018Extent[0] : 0, // lowest duration in the disturbance stop dataset
      0,
      1, // disturbanceStops2018Extent.length ? disturbanceStops2018Extent[1] : 1, // highest duration in the disturbance stop dataset
      1
    ]
  };

  useEffect(() => {
    axios.get(requestUrl).then(response => {
      setDisturbanceStops2017([
        ...disturbanceStops2017,
        ...response.data.results.features.filter(
          feature => feature.properties.year === 2017
        )
      ]);
      setDisturbanceStops2018([
        ...disturbanceStops2018,
        ...response.data.results.features.filter(
          feature => feature.properties.year === 2018
        )
      ]);
      if (response.data.next) {
        setRequestUrl(response.data.next);
      } else {
        setLoaded(true);
      }
    });
  }, [requestUrl]); // eslint-disable-line

  useEffect(() => {
    setDisturbanceStops2017Extent(
      extent(disturbanceStops2017, d => {
        const { duration } = d.properties;
        return parseInt(
          duration.slice(duration.length - 2, duration.length),
          10
        );
      })
    );
  }, [disturbanceStops2017]);

  useEffect(() => {
    setDisturbanceStops2018Extent(
      extent(disturbanceStops2018, d => {
        const { duration } = d.properties;
        return parseInt(
          duration.slice(duration.length - 2, duration.length),
          10
        );
      })
    );
  }, [disturbanceStops2018]);

  // const isLoading = !isLoaded(data.disturbanceStops);

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

  return (
    <>
      {loaded ? (
        <ComparisonMap
          leftMap={DisturbanceStopsMap2017}
          rightMap={DisturbanceStopsMap2018}
        />
      ) : null}
    </>
  );
};

DisturbanceStopsVisualization.propTypes = {
  data: PropTypes.shape({ disturbanceStops: resourceShape })
};

export default DisturbanceStopsVisualization;
