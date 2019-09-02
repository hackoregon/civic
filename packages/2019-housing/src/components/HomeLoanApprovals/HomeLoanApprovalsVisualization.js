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

const HomeLoanApprovalsVisualization = ({ isLoading, data }) => {
  if (isLoading) return <div>Data Loading...</div>;

  const featuresData = at(data.ncdbCensusTractMap.value, "results.features")[0];
  const polygonFieldName = "blackshare";

  // --- 1990 ---
  const totalLoans = at(data.totalLoans.value, "results")[0];
  const mergedData = featuresData.map(feature => ({
    ...feature,
    properties: {
      ...feature.properties,
      housing: totalLoans.find(
        el => el.fips_code === parseInt(feature.properties.fips, 10)
      )
    }
  }));

  // --- shared color scale ---
  const findDataMinMax = extent(mergedData, f =>
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

  return (
    <>
      {!isLoading && data && (
        <div>
          <ChartContainer
            title="Home Loan Approval Rates by Race"
            subtitle="Comparing Tract-Level Approval Rates to the Share of Existing Homeowners of Color"
          >
            <BaseMap initialZoom={9.9} updateViewport={false}>
              <MapOverlay
                data={mergedData}
                getFillColor={f =>
                  colorScale(f.properties.housing[polygonFieldName])
                }
                onLayerClick={() => {}}
              />
            </BaseMap>
          </ChartContainer>
        </div>
      )}
    </>
  );
};

HomeLoanApprovalsVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({ totalLoans: resourceShape })
};

export default HomeLoanApprovalsVisualization;
