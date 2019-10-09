import React, { useState } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

import {
  BaseMap,
  ScatterPlotMap,
  MapTooltip,
  VisualizationColors,
  RadioButtonGroup,
  ChartContainer,
  civicFormat
} from "@hackoregon/component-library";

const TillamookCountyEarthquakeCasualtyEstimatesVisualization = ({ data }) => {
  const hasLoaded = isLoaded(data.earthquakeCasualties);
  const [dataType, setData] = useState("Nighttime - Injuries");

  const mapStyles = {
    "Daytime - Injuries": {
      field: "DaytimeInjuries",
      color: VisualizationColors.categorical.yellow.mapFormatRGBA,
      opacity: 0.1,
      map: "light",
      timeOfDay: "daytime",
      impact: "injuries"
    },
    "Daytime - Casualties": {
      field: "DaytimeDeaths",
      color: VisualizationColors.categorical.pink.mapFormatRGBA,
      opacity: 0.3,
      map: "light",
      timeOfDay: "daytime",
      impact: "casualties"
    },
    "Nighttime - Injuries": {
      field: "NighttimeInjuries",
      color: VisualizationColors.categorical.green.mapFormatRGBA,
      opacity: 0.1,
      map: "dark",
      timeOfDay: "nighttime",
      impact: "injuries"
    },
    "Nighttime - Casualties": {
      field: "NighttimeDeaths",
      color: VisualizationColors.categorical.green.mapFormatRGBA,
      opacity: 0.3,
      map: "dark",
      timeOfDay: "nighttime",
      impact: "casualties"
    }
  };

  return (
    <>
      <RadioButtonGroup
        grpLabel="Scenario"
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
            <strong>Note:</strong> This visualization uses a large dataset and
            takes a long time to load
          </small>
        </p>
      )}
      <ChartContainer
        loading={!hasLoaded}
        title="Human Impact of a 9.0 Cascadia Earthquake"
        subtitle={`Estimated ${
          mapStyles[dataType].impact
        } in Tillamook County in a ${
          mapStyles[dataType].timeOfDay
        } Cascadia 9.0 earthquake.`}
      >
        {hasLoaded && data && (
          <BaseMap
            initialLongitude={-123.844}
            initialLatitude={45.4562}
            initialZoom={8}
            civicMapStyle={mapStyles[dataType].map}
            minZoom={8}
            maxZoom={14}
            updateViewport={false}
          >
            <ScatterPlotMap
              data={data.earthquakeCasualties.value}
              getPosition={f => f.geometry && f.geometry.coordinates}
              opacity={mapStyles[dataType].opacity}
              getFillColor={mapStyles[dataType].color}
              getRadius={f => f.properties[mapStyles[dataType].field]}
              radiusScale={65}
            >
              <MapTooltip
                primaryName={dataType}
                primaryField={mapStyles[dataType].field}
                formatPrimaryField={f => civicFormat.roundedDecimal(f)}
              />
            </ScatterPlotMap>
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
