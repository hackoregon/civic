import React, { useState } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import {
  BaseMap,
  ScatterPlotMap,
  VisualizationColors,
  RadioButtonGroup,
  ChartContainer
} from "@hackoregon/component-library";

const TillamookCountyEarthquakeCasualtyEstimatesVisualization = ({ data }) => {
  const hasLoaded = isLoaded(data.earthquakeCasualties);
  const [dataType, setData] = useState("Daytime - Injury");

  const mapStyles = {
    "Daytime - Injury": {
      field: "daytime_in",
      color: VisualizationColors.categorical.yellow.mapFormatRGBA,
      opacity: 0.1,
      map: "light"
    },
    "Daytime - Death": {
      field: "daytime_de",
      color: VisualizationColors.categorical.pink.mapFormatRGBA,
      opacity: 0.3,
      map: "light"
    },
    "Nighttime - Injury": {
      field: "nighttim_1",
      color: VisualizationColors.categorical.green.mapFormatRGBA,
      opacity: 0.1,
      map: "dark"
    },
    "Nighttime - Death": {
      field: "nighttime_field",
      color: VisualizationColors.categorical.green.mapFormatRGBA,
      opacity: 0.3,
      map: "dark"
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
      {!hasLoaded && (
        <p>
          <small>
            <strong>Note:</strong> This visualization uses a large dataset that
            has not been optimized and takes a long time to load
          </small>
        </p>
      )}
      <ChartContainer loading={!hasLoaded}>
        {hasLoaded && data && (
          <BaseMap
            initialLongitude={-123.844}
            initialLatitude={45.4562}
            initialZoom={8}
            civicMapStyle={mapStyles[dataType].map}
          >
            <ScatterPlotMap
              data={data.earthquakeCasualties.value}
              getPosition={f => f.geometry && f.geometry.coordinates}
              opacity={mapStyles[dataType].opacity}
              getFillColor={mapStyles[dataType].color}
              getRadius={f => f.properties[mapStyles[dataType].field]}
              radiusScale={65}
            />
          </BaseMap>
        )}
      </ChartContainer>
    </>
  );
};

TillamookCountyEarthquakeCasualtyEstimatesVisualization.propTypes = {
  data: PropTypes.shape({ earthquakeCasualties: resourceShape })
};

export default TillamookCountyEarthquakeCasualtyEstimatesVisualization;
