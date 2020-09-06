import React from "react";
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, text, action } from "@storybook/addon-knobs";
import { Dialog } from "../src";
import { storybookStyles } from "./storyStyles";
import StatefulWrapper from "../src/utils/StatefulWrapper";
import notes from "./dialog.notes.md";

export default () =>
  storiesOf("Component Lib/Basic Inputs/Dialog", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add(
      "Standard",
      () => {
        const title = text("Title");
        return (
          <StatefulWrapper initialState={{ open: true }}>
            {({ get, set }) => {
              return (
                <Dialog
                  title={title}
                  onClose={event => {
                    set({ open: false });
                    action("onChange")(event);
                  }}
                  open={get("open")}
                >
                  <h2>Some stuff in dialog box and things</h2>
                  <p>Other stuff</p>
                </Dialog>
              );
            }}
          </StatefulWrapper>
        );
      },
      { notes }
    );
