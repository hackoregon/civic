/* eslint-disable no-console */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { Dropdown } from "../src";
import { storybookStyles } from "./storyStyles";

export default () =>
  storiesOf("Component Lib/Basic Inputs/Dropdown List", module)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add("Simple usage", () => {
      const options = [
        { value: "0", label: "Murphy" },
        { value: "1", label: "Carter" },
        { value: "2", label: "Bebe" },
        { value: "3", label: "Cissi" }
      ];
      return (
        <Dropdown
          dispatch={dispatch => action => dispatch(action)}
          reduxAction={payload => console.log({ type: "ACTION", payload })}
          options={options}
        />
      );
    });
