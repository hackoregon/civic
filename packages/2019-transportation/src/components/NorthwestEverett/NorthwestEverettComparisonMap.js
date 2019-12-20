import React, { useEffect, useState, useContext } from "react";
import { extent } from "d3-array";
import { BaseMap, ComparisonMap } from "@hackoregon/component-library";
import durationStringToSeconds from "../../utils/duration-parser";
import { NorthwestEverettContext } from "./index";

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
  initialZoom: 16,
  initialLatitude: 45.525225,
  initialLongitude: -122.67449,
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

const NorthwestEverettComparisonMap = () => {
  const data = useContext(NorthwestEverettContext);
  const [disturbanceStops2018, setDisturbanceStops2018] = useState([]);
  const [disturbanceStops2019, setDisturbanceStops2019] = useState([]);

  const [disturbanceStops2018Extent, setDisturbanceStops2018Extent] = useState(
    []
  );
  const [disturbanceStops2019Extent, setDisturbanceStops2019Extent] = useState(
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
      disturbanceStops2018Extent.length ? disturbanceStops2018Extent[0] : 0, // lowest duration in the disturbance stop dataset
      0, // lowest value acts as a zero
      disturbanceStops2018Extent.length ? disturbanceStops2018Extent[1] : 1, // highest duration in the disturbance stop dataset
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
      disturbanceStops2019Extent.length ? disturbanceStops2019Extent[0] : 0, // lowest duration in the disturbance stop dataset
      0,
      disturbanceStops2019Extent.length ? disturbanceStops2019Extent[1] : 1, // highest duration in the disturbance stop dataset
      1
    ]
  };

  useEffect(() => {
    setDisturbanceStops2018([
      ...disturbanceStops2018,
      ...data.features.filter(feature => feature.properties.year === 2018)
    ]);
    setDisturbanceStops2019([
      ...disturbanceStops2019,
      ...data.features.filter(feature => feature.properties.year === 2019)
    ]);
  }, [data]); // eslint-disable-line

  useEffect(() => {
    setDisturbanceStops2018Extent(
      extent(disturbanceStops2018, d => {
        return durationStringToSeconds(d.properties.duration);
      })
    );
  }, [disturbanceStops2018]);

  useEffect(() => {
    setDisturbanceStops2019Extent(
      extent(disturbanceStops2019, d => {
        return durationStringToSeconds(d.properties.duration);
      })
    );
  }, [disturbanceStops2019]);

  const DisturbanceStopsMap2018 = disturbanceStops2018Extent.length ? (
    <BaseMap
      {...baseMapProps}
      civicMapStyle="light"
      mapboxData={{ type: "FeatureCollection", features: disturbanceStops2018 }}
      mapboxLayerOptions={heatmapLayer2017}
    />
  ) : null;
  const DisturbanceStopsMap2019 = disturbanceStops2019Extent.length ? (
    <BaseMap
      {...baseMapProps}
      civicMapStyle="dark"
      mapboxData={{ type: "FeatureCollection", features: disturbanceStops2019 }}
      mapboxLayerOptions={heatmapLayer2018}
    />
  ) : null;

  return data.loaded ? (
    <div style={{ marginBottom: "16px" }}>
      <ComparisonMap
        height={500}
        leftMap={DisturbanceStopsMap2018}
        leftMapTitle="2018"
        leftTitleColor="black !important"
        rightMap={DisturbanceStopsMap2019}
        rightMapTitle="2019"
        rightTitleColor="white !important"
      />
    </div>
  ) : null;
};

export default NorthwestEverettComparisonMap;
