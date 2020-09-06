/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  select,
  number,
  boolean,
  object,
  button
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { BaseMap, MapOverlay, DemoJSONLoader } from "../src";
import notes from "./baseMap.notes.md";
import StatefulWrapper from "../src/utils/StatefulWrapper";

const GROUP_IDS = {
  DESIGN: "Design",
  CUSTOM: "Custom"
};

const MAP_STYLE_OPTIONS = {
  light: "light",
  dark: "dark",
  disaster: "disaster-game",
  pencil: "pencil"
};

const ZOOM_OPTIONS = {
  range: true,
  min: 1,
  max: 24,
  step: 1
};

const PITCH_OPTIONS = {
  range: true,
  min: 0,
  max: 60,
  step: 1
};

const ANIMATION_OPTIONS = {
  range: true,
  min: 0,
  max: 5000,
  step: 10
};

const animatedMapProps = {
  lon: -122.65,
  lat: 45.5
};

const containerWrapper = css`
  height: 100vh;
  min-height: 500px;
`;

export default () =>
  storiesOf("Component Lib/Maps/Base Map", module)
    .addDecorator(withKnobs)
    .add(
      "Standard",
      () => {
        const civicMapStyle = select(
          "CIVIC Map Styles:",
          MAP_STYLE_OPTIONS,
          MAP_STYLE_OPTIONS["Hack Oregon Light"],
          GROUP_IDS.DESIGN
        );

        return <BaseMap civicMapStyle={civicMapStyle} />;
      },
      {
        notes
      }
    )
    .add(
      "Custom",
      () => {
        const civicMapStyle = select(
          "CIVIC Map Styles:",
          MAP_STYLE_OPTIONS,
          MAP_STYLE_OPTIONS["Hack Oregon Dark"],
          GROUP_IDS.CUSTOM
        );

        const initialLongitude = number(
          "Initial Longitude:",
          -122.6765,
          {},
          GROUP_IDS.CUSTOM
        );

        const initialLatitude = number(
          "Initial Latitude:",
          45.5231,
          {},
          GROUP_IDS.CUSTOM
        );

        const initialZoom = number(
          "Initial Zoom:",
          9.5,
          ZOOM_OPTIONS,
          GROUP_IDS.CUSTOM
        );

        const initialPitch = number(
          "Initial Pitch:",
          0,
          PITCH_OPTIONS,
          GROUP_IDS.CUSTOM
        );

        const height = number("Height:", 500, {}, GROUP_IDS.CUSTOM);

        const navigation = boolean("Navigation:", true, GROUP_IDS.CUSTOM);

        const useScrollZoom = boolean("Scroll Zoom:", false, GROUP_IDS.CUSTOM);

        const onBaseMapClick = info => action("Base Map Clicked")(info);

        return (
          <BaseMap
            civicMapStyle={civicMapStyle}
            initialLongitude={initialLongitude}
            initialLatitude={initialLatitude}
            initialZoom={initialZoom}
            initialPitch={initialPitch}
            height={height}
            navigation={navigation}
            onBaseMapClick={onBaseMapClick}
            useScrollZoom={useScrollZoom}
          />
        );
      },
      {
        notes
      }
    )
    .add(
      "Example: Animate to Coordinates",
      () => {
        button("OMSI", () => {
          animatedMapProps.lon = -122.665567;
          animatedMapProps.lat = 45.508549;
        });

        button("Rocky Butte", () => {
          animatedMapProps.lon = -122.564674;
          animatedMapProps.lat = 45.54554;
        });

        const animationDuration = number("Duration", 1000, ANIMATION_OPTIONS);

        return (
          <BaseMap
            initialLongitude={animatedMapProps.lon}
            initialLatitude={animatedMapProps.lat}
            initialPitch={45}
            initialZoom={14}
            mapGLOptions={{
              scrollZoom: false,
              dragPan: false,
              dragRotate: false,
              doubleClickZoom: false,
              touchZoom: false,
              touchRotate: false,
              keyboard: false
            }}
            navigation={false}
            animationDuration={animationDuration}
            animate
          />
        );
      },
      {
        notes
      }
    )
    .add(
      "Example: With Geocoder",
      () => {
        const geocoder = boolean("Geocoder:", true, GROUP_IDS.CUSTOM);

        const geocoderOptions = object(
          "Geocoder Options:",
          {
            placeholder: "🚀search to blast off✨",
            zoom: 9.5
          },
          GROUP_IDS.CUSTOM
        );

        const locationMarker = boolean(
          "Location Marker:",
          true,
          GROUP_IDS.CUSTOM
        );

        const mapGLOptions = object(
          "MapGL Options:",
          {
            dragPan: false
          },
          GROUP_IDS.CUSTOM
        );

        return (
          <StatefulWrapper
            initialState={{ coord: { latitude: 0, longitude: 0 } }}
          >
            {({ get, set }) => {
              return (
                <BaseMap
                  geocoder={geocoder}
                  geocoderOnChange={coord => {
                    set({ coord });
                  }}
                  geocoderOptions={geocoderOptions}
                  locationMarker={locationMarker}
                  locationMarkerCoord={get("coord")}
                  mapGLOptions={mapGLOptions}
                />
              );
            }}
          </StatefulWrapper>
        );
      },
      {
        notes
      }
    )
    .add(
      "Example: No Interactivity",
      () => {
        const scrollZoomOption = boolean(
          "Scroll Zoom:",
          false,
          GROUP_IDS.CUSTOM
        );
        const dragPanOption = boolean("Drag Pan:", false, GROUP_IDS.CUSTOM);
        const dragRotateOption = boolean(
          "Drag Rotate:",
          false,
          GROUP_IDS.CUSTOM
        );
        const doubleClickZoomOption = boolean(
          "Double Click Zoom:",
          false,
          GROUP_IDS.CUSTOM
        );
        const touchZoomOption = boolean("Touch Zoom:", false, GROUP_IDS.CUSTOM);
        const touchRotateOption = boolean(
          "Touch Rotate:",
          false,
          GROUP_IDS.CUSTOM
        );
        const keyboardOption = boolean("Keyboard:", false, GROUP_IDS.CUSTOM);

        return (
          <BaseMap
            navigation={false}
            mapGLOptions={{
              scrollZoom: scrollZoomOption,
              dragPan: dragPanOption,
              dragRotate: dragRotateOption,
              doubleClickZoom: doubleClickZoomOption,
              touchZoom: touchZoomOption,
              touchRotate: touchRotateOption,
              keyboard: keyboardOption
            }}
          />
        );
      },
      {
        notes
      }
    )
    .add(
      "Example: Use Container Height",
      () => {
        const useContainerHeight = boolean(
          "Use Container Height:",
          true,
          GROUP_IDS.CUSTOM
        );

        return (
          <div css={containerWrapper}>
            <BaseMap useContainerHeight={useContainerHeight} />
          </div>
        );
      },
      {
        notes
      }
    )
    .add(
      "Example: With Scale Bar",
      () => {
        return (
          <div css={containerWrapper}>
            <BaseMap
              scaleBar
              scaleBarOptions={{
                maxWidth: 200,
                units: "imperial"
              }}
            />
          </div>
        );
      },
      {
        notes
      }
    )
    .add(
      "Example: Fit Bounds",
      () => {
        const CIVIC_API_URL =
          "https://service.civicpdx.org/disaster-resilience/api/DisasterNeighborhoodView/" +
          "?format=json&offset=75&limit=1";
        return (
          <DemoJSONLoader urls={[CIVIC_API_URL]}>
            {data => {
              return (
                <div css={containerWrapper}>
                  <BaseMap
                    useContainerHeight
                    useFitBounds
                    bboxData={data.results.features}
                    bboxPadding={20}
                  >
                    <MapOverlay
                      data={data.results.features}
                      getFillColor={[25, 183, 170]}
                    />
                  </BaseMap>
                </div>
              );
            }}
          </DemoJSONLoader>
        );
      },
      {
        notes
      }
    );
