import React from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { resourceShape } from "reduxful/react-addons";
import { scaleQuantize, extent } from "d3";

import {
  BaseMap,
  ChartContainer,
  MapOverlay
} from "@hackoregon/component-library";

const BlackPopulationChangeVisualization = ({ isLoading, data }) => {
  if (isLoading) return <div>Data Loading...</div>;

  const featuresData = at(data.ncdbCensusTractMap.value, "results.features")[0];
  const polygonFieldName = "blackshare";

  // --- 1990 ---
  const housingData1990 = at(data.ncdbYearly1990.value, "results")[0];
  const mergedData1990 = featuresData.map(feature => ({
    ...feature,
    properties: {
      ...feature.properties,
      housing: housingData1990.find(
        el => el.fips_code === parseInt(feature.properties.fips, 10)
      )
    }
  }));
  // --- 2017 ---
  const housingData2017 = at(data.ncdbYearly2017.value, "results")[0];
  const mergedData2017 = featuresData.map(feature => ({
    ...feature,
    properties: {
      ...feature.properties,
      housing: housingData2017.find(
        el => el.fips_code === parseInt(feature.properties.fips, 10)
      )
    }
  }));

  // --- shared color scale ---
  const findDataMinMax = extent([...mergedData1990, ...mergedData2017], f =>
    parseFloat(f.properties.housing[polygonFieldName])
  );
  const colorScale = scaleQuantize()
    .domain(findDataMinMax)
    .range([
      [255, 247, 251],
      [236, 226, 240],
      [208, 209, 230],
      [166, 189, 219],
      [103, 169, 207],
      [54, 144, 192],
      [2, 129, 138],
      [1, 108, 89],
      [1, 70, 54]
    ]);

  console.log("✨✨✨", {
    featuresData,
    data,
    housingData1990,
    mergedData1990
  });

  return (
    data && (
      <div>
        <ChartContainer
          title="Black Population Share by Census Tract, 1990"
          subtitle="subtitle"
        >
          <BaseMap initialZoom={9.9} updateViewport={false}>
            <MapOverlay
              data={mergedData1990}
              getFillColor={f =>
                colorScale(f.properties.housing[polygonFieldName])
              }
              onLayerClick={() => {}}
            />
          </BaseMap>
        </ChartContainer>
        <br />
        <ChartContainer
          title="Black Population Share by Census Tract, 2017"
          subtitle="subtitle"
        >
          <BaseMap initialZoom={9.9} updateViewport={false}>
            <MapOverlay
              data={mergedData2017}
              getFillColor={f =>
                colorScale(f.properties.housing[polygonFieldName])
              }
              onLayerClick={() => {}}
            />
          </BaseMap>
        </ChartContainer>
      </div>
    )
  );
};

BlackPopulationChangeVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    ncdbYearly1990: resourceShape,
    ncdbYearly2017: resourceShape,
    ncdbCensusTractMap: resourceShape
  })
};

export default BlackPopulationChangeVisualization;
