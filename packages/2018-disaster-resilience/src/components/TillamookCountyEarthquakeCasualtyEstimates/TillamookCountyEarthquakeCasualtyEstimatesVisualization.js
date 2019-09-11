import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import { BaseMap, ScatterPlotMap } from "@hackoregon/component-library";

const TillamookCountyEarthquakeCasualtyEstimatesVisualization = ({ data }) => {
  const hasLoaded = isLoaded(data.earthquakeCasualties);

  return (
    <>
      {hasLoaded && data && (
        <BaseMap initialLongitude={-123.8093} initialLatitude={45.6956}>
          <ScatterPlotMap
            data={data.earthquakeCasualties.value}
            getPosition={f =>
              f.geometry ? f.geometry.coordinates : [-124.664355, 45.615779]
            }
            opacity={1}
            getFillColor={[25, 183, 170, 255]}
            radiusScale={1}
          />
        </BaseMap>
      )}
    </>
  );
};

TillamookCountyEarthquakeCasualtyEstimatesVisualization.propTypes = {
  data: PropTypes.shape({ earthquakeCasualties: resourceShape })
};

export default TillamookCountyEarthquakeCasualtyEstimatesVisualization;
