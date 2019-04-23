import React from "react";
import { css } from "emotion";
import { storybookStyles } from "../storyStyles.js";

const TheBrandStyle = () => (
  <div style={storybookStyles.main}>
    <h1>Welcome to the CIVIC Brand</h1>
    <p>
      All of us connected to the Civic platform are the Brand. The logo, colors,
      typography, etc is all meant as shorthand for expressing our intent and
      values.
    </p>
    <h2>Values</h2>
    <ul>
      <li>Data for the People by the People</li>
      <li>Story over Framework</li>
      <li>Usable over Pretty</li>
      <li>Neutrality over Partisanship</li>
      <li>Inclusion over Specificity</li>
      <li>Clarity over Saturation</li>
    </ul>
    <p>
      Our Storybook is iterative and will be updated as the CIVIC Platform
      continues to grow. Please reach out to us in the SLACK #team_design
      channel with any questions about usage or suggestions for improving the
      stories.
    </p>
  </div>
);

export default TheBrandStyle;
