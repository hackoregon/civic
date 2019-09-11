import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { extent } from "d3-array";
import { scaleLinear, scalePow } from "d3-scale";

import {
  BaseMap,
  MapTooltip,
  ScatterPlotMap
} from "@hackoregon/component-library";

function totalOnsOffsAccessor(feature) {
  return feature.properties.total_offs + feature.properties.total_ons;
}

function secondsLateAccessor(feature) {
  return feature.properties.median_seconds_late;
}

function samplesAccessor(feature) {
  return feature.properties.samples;
}

const MorningRushVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.busAmRushSummary);
  const [totalOnsOffsExtent, setTotalOnsOffsExtent] = useState([0, 0]);
  const [secondsLateExtent, setSecondsLateExtent] = useState([0, 0]);
  const [samplesExtent, setSamplesExtent] = useState([0, 0]);

  console.log({ secondsLateExtent, samplesExtent });

  useEffect(() => {
    if (!isLoading) {
      setTotalOnsOffsExtent(
        extent(
          data.busAmRushSummary.value.results.features,
          totalOnsOffsAccessor
        )
      );
      setSecondsLateExtent(
        extent(
          data.busAmRushSummary.value.results.features,
          secondsLateAccessor
        )
      );
      setSamplesExtent(
        extent(data.busAmRushSummary.value.results.features, samplesAccessor)
      );
    }
  }, [isLoading]); // eslint-disable-line

  return !isLoading && data ? (
    <>
      <BaseMap civicMapStyle="dark">
        <ScatterPlotMap
          data={data.busAmRushSummary.value.results.features.map(feature => {
            const featureWithTotalOnOffs = feature;
            featureWithTotalOnOffs.properties.total_ons_offs = totalOnsOffsAccessor(
              feature
            );
            return featureWithTotalOnOffs;
          })}
          getFillColor={feature => {
            const medianSecondsLate = secondsLateAccessor(feature);
            const scale = scaleLinear()
              .domain([0, 180])
              .range(["lightblue", "red"]);
            const colorOut = scale(medianSecondsLate);
            const colorArray = colorOut
              .replace("rgb(", "")
              .replace(")", "")
              .split(",")
              .map(value => parseInt(value, 10));
            return [...colorArray, 100];
          }}
          getRadius={feature => {
            const totalOnOffs = totalOnsOffsAccessor(feature);
            // const scale = scaleLinear().domain(totalOnsOffsExtent).range([25, 100]);
            const scale = scalePow()
              .domain(totalOnsOffsExtent)
              .range([25, 100]);
            return scale(totalOnOffs);
          }}
          radiusScale={7}
        >
          <MapTooltip
            primaryName="Stop Name"
            primaryField="stop_name"
            secondaryName="Median seconds late"
            secondaryField="median_seconds_late"
          />
        </ScatterPlotMap>
      </BaseMap>
    </>
  ) : null;
};

MorningRushVisualization.propTypes = {
  data: PropTypes.shape({ onOffs: resourceShape })
};

export default MorningRushVisualization;
