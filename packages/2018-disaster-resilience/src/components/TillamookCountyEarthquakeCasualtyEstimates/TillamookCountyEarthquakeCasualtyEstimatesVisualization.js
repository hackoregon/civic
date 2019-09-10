import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { ScatterPlotMap } from "@hackoregon/component-library";

const TillamookCountyEarthquakeCasualtyEstimatesVisualization = ({ data }) => {
  const isLoading = !isLoaded(data.earthquakeCasualties);
  const earthquakeCasualtiesData = get(
    data.earthquakeCasualties.value.results.features
  );

  return (
    <>
      {!isLoading && data && (
        <ScatterPlotMap
          data={earthquakeCasualtiesData}
          getPosition={f =>
            f.geometry ? f.geometry.coordinates : [-124.664355, 45.615779]
          }
          opacity={0.1}
          getFillColor={[25, 183, 170, 255]}
          radiusScale={1}
        />
      )}
    </>
  );
};

TillamookCountyEarthquakeCasualtyEstimatesVisualization.propTypes = {
  data: PropTypes.shape({ earthquakeCasualties: resourceShape })
};

export default TillamookCountyEarthquakeCasualtyEstimatesVisualization;
