import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { BaseMap, ComparisonMap } from "@hackoregon/component-library";

const baseMapProps = {
  updateViewport: false,
  initialZoom: 14.5,
  initialLatitude: 45.512,
  initialLongitude: -122.659
  // mapboxDataId:"transit-stops-data",
  // mapboxLayerType:"heatmap",
  // mapboxData:someKindofData.results,
  // mapboxDataId:"transit-stops-data",
  // mapboxLayerType:"heatmap",
  // mapboxLayerOptions:heatmapLayer,
  // mapboxLayerId:"transit-stops-map",
  // civicMapStyle:"dark",
  // navigation:false,
  // mapGLOptions:mapGLOptions,
};

// http://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=100&offset=400&months=9&time_range=6.25%2C9.5&years=2017%2C2018&lines=6%2C10%2C14&service_key=W&bounds=-122.665849%2C45.510867%2C-122.653650%2C45.514367
const limit = 100;
const offset = 0;
const months = "9";
const timeRange = "6.25,9.5";
const years = "2017,2018";
const lines = "14";
const bounds = "-122.665849,45.510867,-122.653650,45.514367";
const testUrl = `http://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=${limit}&offset=${offset}&months=${months}&time_range=${timeRange}&years=${years}&lines=${lines}&service_key=W&bounds=${bounds}`;

const DisturbanceStopsVisualization = ({ data }) => {
  const [disturbanceStops2017, setDisturbanceStops2017] = useState([]);
  const [disturbanceStops2018, setDisturbanceStops2018] = useState([]);

  useEffect(() => {
    axios.get(testUrl).then(response => {
      console.log({ response });
      setDisturbanceStops2017(
        response.data.results.features.filter(
          feature => feature.properties.year === 2017
        )
      );
      setDisturbanceStops2018(
        response.data.results.features.filter(
          feature => feature.properties.year === 2018
        )
      );
    });
  }, []);

  const isLoading = !isLoaded(data.disturbanceStops);

  const DisturbanceStopsMap2017 = <BaseMap {...baseMapProps} />;
  const DisturbanceStopsMap2018 = <BaseMap {...baseMapProps} />;

  console.log({ disturbanceStops2017 });
  console.log({ disturbanceStops2018 });

  return (
    <>
      {!isLoading && data && (
        <ComparisonMap
          leftMap={DisturbanceStopsMap2017}
          rightMap={DisturbanceStopsMap2018}
        />
      )}
    </>
  );
};

DisturbanceStopsVisualization.propTypes = {
  data: PropTypes.shape({ disturbanceStops: resourceShape })
};

export default DisturbanceStopsVisualization;
