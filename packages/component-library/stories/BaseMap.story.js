import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  select,
  number,
  boolean,
  object
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { css } from "emotion";
import { BaseMap } from "../src";
import notes from "./baseMap.notes.md";

const GROUP_IDS = {
  DESIGN: "Design",
  CUSTOM: "Custom"
};

const MAP_STYLE_OPTIONS = {
  light: "light",
  dark: "dark"
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

export default () =>
  storiesOf("Component Lib|Maps/Base Map", module)
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
          GROUP_IDS.DESIGN
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
          <BaseMap
            geocoder={geocoder}
            geocoderOptions={geocoderOptions}
            locationMarker={locationMarker}
            mapGLOptions={mapGLOptions}
          />
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
        const containerWrapper = css`
          height: 100vh;
          min-height: 500px;
        `;

        const useContainerHeight = boolean(
          "Use Container Height:",
          true,
          GROUP_IDS.CUSTOM
        );

        return (
          <div className={containerWrapper}>
            <BaseMap useContainerHeight={useContainerHeight} />
          </div>
        );
      },
      {
        notes
      }
    );
