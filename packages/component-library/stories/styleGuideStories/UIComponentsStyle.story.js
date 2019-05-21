import React from "react";
import { storybookStyles } from "../storyStyles";

const UIComponentsStyle = () => (
  <div style={storybookStyles.main}>
    <h1>Basic UI Components Style Guide</h1>
    <p>This is the Style Guide for basic UI Components.</p>
    <h4>
      <a href="#button">Button</a>
    </h4>
    <h4>Checkbox</h4>
    <h4>Dropdown List</h4>
    <h4>Radio Buttons</h4>
    <h4>Slider</h4>
    <h4>Text Input Field</h4>
    <h2 id="button">Button</h2>
    <p>Style information for buttons.</p>
    <p>Buttons are a call to action. They should not be used for links.</p>
    <p>
      Button labels should be an active verb. Write labels in sentence case.
    </p>
    <p>
      Sometimes an image, such as an icon or emoji, better represents what the
      button does. Always put descriptive text near the button if the label is
      non-textual. To meet accessibility requirements, use an aria-label tag.
    </p>
    <p />

    <h2>Checkbox</h2>
    <p>Style information for checkboxes.</p>
    <h2>Dropdown List</h2>
    <p>Style information for dropdown lists.</p>
    <h2>Radio Buttons</h2>
    <p>Style information for radio buttons.</p>
    <h2>Slider</h2>
    <p>Style information for sliders.</p>
    <h2>Text Input Field</h2>
    <p>Style information for text input fields.</p>
  </div>
);

export default UIComponentsStyle;
