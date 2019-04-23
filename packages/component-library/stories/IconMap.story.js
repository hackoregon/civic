import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { BaseMap } from "../src";
import { IconMap } from "../src";
import { MapTooltip } from "../src";
import { DemoJSONLoader } from "../src";

const displayName = IconMap.displayName || "IconMap";

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.1
};

const poiIconMapping = {
  School: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  Hospital: {
    x: 250,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  BEECN: {
    x: 500,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  "Fire Station": {
    x: 0,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  Pin: {
    x: 250,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  COMMCTR: {
    x: 500,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  }
};

const poiIconZoomScale = zoom =>
  zoom > 11.5
    ? 10
    : zoom > 10.5
    ? 8
    : zoom > 9.5
    ? 6
    : zoom > 8.5
    ? 4
    : zoom > 7.5
    ? 2
    : 1;

const getPosition = f =>
  !!f.geometry ? f.geometry.coordinates : [-124.664355, 45.615779];

const getIcon = d => d.properties.type;

const iconSizeOptions = {
  range: true,
  min: 1,
  max: 15,
  step: 1
};

const poiGetIconColor = f =>
  f.properties.type === "BEECN"
    ? [0, 0, 0, 255]
    : f.properties.type === "COMMCTR"
    ? [114, 29, 124, 255]
    : f.properties.type === "Fire Station"
    ? [220, 69, 86, 255]
    : f.properties.type === "School"
    ? [255, 178, 38, 255]
    : f.properties.type === "Hospital"
    ? [30, 98, 189, 255]
    : [0, 0, 0, 255];

const mapData = [
  "https://service.civicpdx.org/disaster-resilience/sandbox/slides/poi/"
];

const demoMap = () => (
  <DemoJSONLoader urls={mapData}>
    {data => {
      const opacity = number("Opacity:", 1, opacityOptions);
      const iconSize = number("Icon Size:", 10, iconSizeOptions);
      const getSize = f => iconSize;
      return (
        <BaseMap>
          <IconMap
            data={data.slide_data.features}
            opacity={opacity}
            iconAtlas="https://i.imgur.com/xgTAROe.png"
            iconMapping={poiIconMapping}
            iconSizeScale={poiIconZoomScale}
            getPosition={getPosition}
            getIcon={getIcon}
            getSize={getSize}
            getColor={poiGetIconColor}
            onLayerClick={info =>
              action("Layer clicked:", { depth: 2 })(info, info.object)
            }
          />
        </BaseMap>
      );
    }}
  </DemoJSONLoader>
);

const tooltipMap = () => (
  <DemoJSONLoader urls={mapData}>
    {data => {
      const opacity = number("Opacity:", 1, opacityOptions);
      const iconSize = number("Icon Size:", 10, iconSizeOptions);
      const getSize = f => iconSize;
      return (
        <BaseMap>
          <IconMap
            data={data.slide_data.features}
            opacity={opacity}
            iconAtlas="https://i.imgur.com/xgTAROe.png"
            iconMapping={poiIconMapping}
            iconSizeScale={poiIconZoomScale}
            getPosition={getPosition}
            getIcon={getIcon}
            getSize={getSize}
            getColor={poiGetIconColor}
            onLayerClick={info =>
              action("Layer clicked:", { depth: 2 })(info, info.object)
            }
          >
            <MapTooltip
              primaryName={"Type"}
              primaryField={"type"}
              secondaryName={"Description"}
              secondaryField={"description2_txt"}
            />
          </IconMap>
        </BaseMap>
      );
    }}
  </DemoJSONLoader>
);

export default () =>
  storiesOf("Maps/Icon Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add("Simple usage", demoMap)
    .add("With tooltip", tooltipMap);
