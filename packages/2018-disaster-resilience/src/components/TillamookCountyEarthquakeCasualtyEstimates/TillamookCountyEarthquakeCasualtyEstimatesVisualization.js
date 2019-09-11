import React, { useState } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import {
  BaseMap,
  ScatterPlotMap,
  VisualizationColors,
  RadioButtonGroup
} from "@hackoregon/component-library";

const TillamookCountyEarthquakeCasualtyEstimatesVisualization = ({ data }) => {
  const hasLoaded = isLoaded(data.earthquakeCasualties);
  const [dataType, setData] = useState("Daytime - Injury");

  const mapStyles = {
    "Daytime - Injury": {
      field: "Daytime_injury",
      color: VisualizationColors.categorical.yellow.mapFormatRGBA,
      opacity: 0.1
    },
    "Daytime - Death": {
      field: "Daytime_death",
      color: VisualizationColors.categorical.pink.mapFormatRGBA,
      opacity: 0.3
    },
    "Nighttime - Injury": {
      field: "Nighttime_injury",
      color: VisualizationColors.categorical.green.mapFormatRGBA,
      opacity: 0.1
    },
    "Nighttime - death": {
      field: "Nighttime_death",
      color: VisualizationColors.categorical.green.mapFormatRGBA,
      opacity: 0.3
    }
  };

  return (
    <>
      <RadioButtonGroup
        grpLabel="Type"
        labels={Object.keys(mapStyles)}
        value={dataType}
        onChange={event => {
          setData(event.target.value);
        }}
        row
      />
      {hasLoaded && data && (
        <BaseMap initialLongitude={-123.8093} initialLatitude={45.6956}>
          <ScatterPlotMap
            data={data.earthquakeCasualties.value}
            getPosition={f =>
              f.geometry ? f.geometry.coordinates : [-124.664355, 45.615779]
            }
            opacity={1}
            getFillColor={mapStyles[dataType].color}
            getRadius={f => f[mapStyles[dataType].field]}
            radiusScale={65}
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
