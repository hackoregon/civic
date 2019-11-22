import React, { useState } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { Link } from "react-router";

import {
  BaseMap,
  RadioButtonGroup,
  ScreenGridMap,
  MapTooltip,
  ChartContainer,
  civicFormat
} from "@hackoregon/component-library";

const EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization = ({
  data
}) => {
  const hasLoaded = isLoaded(data.damageEstimates);
  const [dataType, setData] = useState("Commercial");

  const mapStyles = {
    Commercial: {
      field: "ComLossRatio",
      opacity: 0.5,
      map: "light",
      buildingType: "commercial"
    },
    Residential: {
      field: "ResLossRatio",
      opacity: 0.5,
      map: "light",
      buildingType: "residential"
    }
  };

  return (
    <>
      <RadioButtonGroup
        grpLabel="Building Type"
        labels={Object.keys(mapStyles)}
        value={dataType}
        onChange={event => {
          setData(event.target.value);
        }}
        row
      />
      <p>
        {hasLoaded ? (
          <small>
            Zoom for more granular details. A darker color indicates a greater
            proportion of financial losses.
          </small>
        ) : (
          <small>
            <strong>Note:</strong> This visualization uses a large dataset and
            takes a long time to load
          </small>
        )}
      </p>
      <ChartContainer
        loading={!hasLoaded}
        title="Building Impact of a 9.0 Cascadia Earthquake"
        subtitle={`Projected financial damage to ${
          mapStyles[dataType].buildingType
        } buildings in a Cascadia 9.0 earthquake.`}
      >
        {hasLoaded && data && (
          <>
            <BaseMap
              initialLongitude={-123.844}
              initialLatitude={45.4562}
              initialZoom={8}
              minZoom={8}
              maxZoom={14}
              updateViewport={false}
              civicMapStyle={mapStyles[dataType].map}
            >
              <ScreenGridMap
                data={data.damageEstimates.value.filter(
                  feature => feature.properties[mapStyles[dataType].field]
                )}
                getPosition={f => f.geometry && f.geometry.coordinates}
                opacity={mapStyles[dataType].opacity}
                getWeight={f => f.properties[mapStyles[dataType].field]}
                getSize={() => 15}
                colorRange={
                  /* temporary implementation until #1152 is resolved */

                  [
                    [255, 255, 178],
                    [254, 217, 118],
                    [254, 178, 76],
                    [253, 141, 60],
                    [240, 59, 32],
                    [189, 0, 38]
                  ]
                }
                colorDomain={[0, 1]}
                getCursor={() => "default"}
                aggregation="MEAN"
              >
                <MapTooltip
                  tooltipDataArray={[
                    {
                      name: `Average loss ratio`,
                      field: "cellWeight",
                      formatField: civicFormat.percentage
                    },
                    {
                      name: `Number of ${
                        mapStyles[dataType].buildingType
                      } buildings`,
                      field: "cellCount",
                      formatField: civicFormat.numeric
                    }
                  ]}
                  isScreenGrid
                  wide
                />
              </ScreenGridMap>
            </BaseMap>
            <Link to="/sandbox">See more in the Civic Sandbox</Link>
          </>
        )}
      </ChartContainer>
    </>
  );
};

EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization.propTypes = {
  data: PropTypes.shape({ earthquakeDamageEstimate: resourceShape })
};

export default EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization;
