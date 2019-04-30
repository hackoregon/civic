/* eslint-disable no-console */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { Dropdown } from "../src";
import { storybookStyles } from "./storyStyles";

const title = "Simple usage";

const demoCode = () => (
  <Dropdown
    dispatch={dispatch => action => dispatch(action)}
    reduxAction={payload => console.log({ type: "ACTION", payload })}
    options={[
      { value: "0", label: "David" },
      { value: "1", label: "Daniel" },
      { value: "2", label: "Last" },
      { value: "3", label: "Name" }
    ]}
  />
);

export default () =>
  storiesOf("Component Lib|Basic UI Components/Dropdown List", module)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add(title, demoCode);
