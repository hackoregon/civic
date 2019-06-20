/* eslint-disable no-nested-ternary */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  boolean,
  text,
  object,
  select,
  array
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { BaseMap, IconMap, MapTooltip, DemoJSONLoader } from "../src";

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
  f.geometry ? f.geometry.coordinates : [-124.664355, 45.615779];

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

// Use for props in knob method
const GROUP_IDS = {
  MARKERS: "Markers",
  DATA: "Data"
};

const demoMap = () => (
  <DemoJSONLoader urls={mapData}>
    {data => {
      const helperFunc = func => func;

      // >>> Below are vars for Marker Group <<< \\

      // const getIcon // Proptype.Funciton

      console.log(getIcon);

      const getSize = number(
        "Icon Size:",
        10,
        iconSizeOptions,
        GROUP_IDS.MARKERS
      );

      const iconAtlas = text(
        "Icon Atlas",
        "https://i.imgur.com/xgTAROe.png",
        GROUP_IDS.MARKERS
      );

      const iconMapping = object(
        "Icon Mapping",
        poiIconMapping,
        GROUP_IDS.MARKERS
      );

      // const iconSizeScale // Proptype.Funciton

      // const getColor // Proptype.Funciton

      const opacity = number("Opacity:", 1, opacityOptions, GROUP_IDS.MARKERS);

      // >>> Below are vars for Data Group <<< \\

      // console.log(data.slide_data.features);

      const dataSelector = data.slide_data.features.map(dataPoint => dataPoint);

      const getPositionStory = select(
        "Position",
        getPosition,
        getPosition[0],
        GROUP_IDS.DATA
      );

      const dataStory = select(
        "Data",
        dataSelector,
        dataSelector[0],
        GROUP_IDS.DATA
      );

      return (
        <BaseMap>
          <IconMap
            data={data.slide_data.features}
            opacity={opacity}
            iconAtlas={iconAtlas}
            iconMapping={iconMapping}
            iconSizeScale={poiIconZoomScale}
            getPosition={getPosition}
            getIcon={getIcon}
            getSize={helperFunc(getSize)}
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
      const getSize = () => iconSize;
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
              primaryName="Type"
              primaryField="type"
              secondaryName="Description"
              secondaryField="description2_txt"
            />
          </IconMap>
        </BaseMap>
      );
    }}
  </DemoJSONLoader>
);

class TouchScreenDemo extends React.Component {
  state = {
    pointsData: [
      {
        geometry: {
          coordinates: [-122.6658475, 45.5084872]
        },
        properties: {
          type: "BEECN"
        }
      }
    ]
  };

  onClick = ({ lngLat }) => {
    this.setState({
      pointsData: [
        ...this.state.pointsData,
        {
          geometry: {
            coordinates: lngLat
          },
          properties: {
            type: "Pin"
          }
        }
      ]
    });
  };

  clearPoints = () => {
    this.setState({ pointsData: [] });
  };

  render() {
    const { pointsData } = this.state;

    const touchZoomRotateOption = boolean("Touch Zoom/Rotate:", true);
    const doubleClickZoomOption = boolean("Double Click Zoom:", true);
    const dragPanOption = boolean("Drag Pan:", true);
    const dragRotateOption = boolean("Drag Rotate:", true);

    const getIconColor = f =>
      f.properties.type === "BEECN" ? [238, 73, 92] : [25, 183, 170];

    return (
      <div style={{ height: "95vh", minHeight: "500px" }}>
        <BaseMap
          initialZoom={15}
          initialLatitude={45.5084872}
          initialLongitude={-122.6658475}
          mapGLOptions={{
            touchZoomRotate: touchZoomRotateOption,
            doubleClickZoom: doubleClickZoomOption,
            dragPan: dragPanOption,
            dragRotate: dragRotateOption,
            scrollZoom: touchZoomRotateOption
          }}
          onBaseMapClick={this.onClick}
          updateViewport={false}
          useContainerHeight
        >
          <IconMap
            data={pointsData}
            opacity={1.0}
            iconAtlas="https://i.imgur.com/xgTAROe.png"
            iconMapping={poiIconMapping}
            iconSizeScale={poiIconZoomScale}
            getPosition={getPosition}
            getIcon={getIcon}
            getSize={() => 7}
            getColor={getIconColor}
          />
        </BaseMap>
        <input
          type="button"
          onClick={this.clearPoints}
          value="Clear all points"
        />
      </div>
    );
  }
}

export default () =>
  storiesOf("Component Lib|Maps/Icon Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add("Standard", demoMap)
    .add("Examples: With Tooltip", tooltipMap)
    .add("Examples: Touch Screen", () => <TouchScreenDemo />);
