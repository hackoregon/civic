/* eslint-disable no-nested-ternary */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { at } from "lodash";
import {
  mdiSchool,
  mdiHospitalBuilding,
  mdiRadioTower,
  mdiFireTruck,
  mdiAccountGroup,
  mdiMapMarker
} from "@mdi/js";
import {
  BaseMap,
  IconMap,
  MapTooltip,
  DemoJSONLoader,
  ScatterPlotMap
} from "../src";

const iconMaker = (
  mdiIconName,
  width = 240,
  height = 240,
  viewbox = "0 0 48 48"
) =>
  `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px" viewBox="${viewbox}"><path d="${mdiIconName}"/></svg>`;

const iconSet = {
  1: iconMaker(mdiSchool),
  2: iconMaker(mdiHospitalBuilding),
  3: iconMaker(mdiRadioTower),
  4: iconMaker(mdiFireTruck),
  5: iconMaker(mdiAccountGroup),
  6: iconMaker(mdiMapMarker)
};

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
  max: 100,
  step: 1
};

const iconColorSet = {
  1: [255, 178, 38, 255],
  2: [30, 98, 189, 255],
  3: [65, 175, 73, 255],
  4: [220, 69, 86, 255],
  5: [114, 29, 124, 255],
  6: [0, 0, 0, 255]
};

const API_URL =
  "https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson";

const GROUP_IDS = {
  MARKER: "Design",
  DATA: "Data",
  CUSTOM: "Custom"
};

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
    this.setState(prevState => ({
      pointsData: [
        ...prevState.pointsData,
        {
          geometry: {
            coordinates: lngLat
          },
          properties: {
            type: "Pin"
          }
        }
      ]
    }));
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
            autoHighlight
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

const getRandomInt = (numMin, numMax) => {
  const min = Math.ceil(numMin);
  const max = Math.floor(numMax);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default () =>
  storiesOf("Component Lib|Maps/Icon Map", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .add(
      "Standard",
      () => {
        const opacity = number(
          "Opacity:",
          0.9,
          opacityOptions,
          GROUP_IDS.MARKER
        );
        const iconSize = number(
          "Icon Size:",
          20,
          iconSizeOptions,
          GROUP_IDS.MARKER
        );

        const onIconClick = info => action("Icon Clicked:")(info);
        const fetchURL = text("Data API URL:", API_URL, GROUP_IDS.DATA);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "features",
                GROUP_IDS.DATA
              );
              const featuresData = at(data, featuresArrayPath)[0];

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap updateViewport={false} useContainerHeight>
                    <ScatterPlotMap
                      data={featuresData}
                      getPosition={f => f.geometry.coordinates}
                      opacity={0.9}
                      getFillColor={[0, 0, 0]}
                      getRadius={15}
                    />
                    <IconMap
                      data={featuresData}
                      opacity={opacity}
                      iconSizeScale={poiIconZoomScale}
                      getPosition={getPosition}
                      getIcon={f => {
                        const rand = getRandomInt(1, 6);
                        return {
                          id: f.properties.OBJECTID,
                          url: iconSet[rand],
                          height: 960,
                          width: 960,
                          mask: true,
                          anchorX: 240,
                          anchorY: 240
                        };
                      }}
                      getSize={iconSize}
                      getColor={() => {
                        const rand = getRandomInt(1, 6);
                        return iconColorSet[rand];
                      }}
                      onLayerClick={onIconClick}
                    />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {}
    )
    .add(
      "Example: With Tooltip",
      () => {
        const opacity = number(
          "Opacity:",
          0.9,
          opacityOptions,
          GROUP_IDS.MARKER
        );
        const iconSize = number(
          "Icon Size:",
          15,
          iconSizeOptions,
          GROUP_IDS.MARKER
        );

        const onIconClick = info => action("Icon Clicked:")(info);
        const fetchURL = text("Data API URL:", API_URL, GROUP_IDS.DATA);

        return (
          <DemoJSONLoader urls={[fetchURL]}>
            {data => {
              const featuresArrayPath = text(
                "Features Array Path:",
                "features",
                GROUP_IDS.DATA
              );
              const featuresData = at(data, featuresArrayPath)[0];

              return (
                <div style={{ height: "100vh" }}>
                  <BaseMap updateViewport={false} useContainerHeight>
                    <IconMap
                      data={featuresData}
                      opacity={opacity}
                      iconSizeScale={poiIconZoomScale}
                      getPosition={getPosition}
                      getIcon={f => {
                        const rand = getRandomInt(1, 6);
                        return {
                          id: f.properties.OBJECTID,
                          url: iconSet[rand],
                          height: 480,
                          width: 480,
                          mask: true,
                          anchorX: 120,
                          anchorY: 120
                        };
                      }}
                      getSize={iconSize}
                      getColor={() => {
                        const rand = getRandomInt(1, 6);
                        return iconColorSet[rand];
                      }}
                      onLayerClick={onIconClick}
                    >
                      <MapTooltip
                        primaryName="Type"
                        primaryField="COMMON"
                        secondaryName="Notes"
                        secondaryField="NOTES"
                      />
                    </IconMap>
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {}
    )
    .add("TouchScreen Demo", () => <TouchScreenDemo />);
