import React from "react";
import { storybookStyles } from "./storyStyles.js";
import CivicLogo from "../src/Logo/CivicLogo";
import CivicLogoInverted from "../src/Logo/CivicLogoInverted";
import CivicLogoC from "../src/Logo/CivicLogoC";
import CivicLogoCInverted from "../src/Logo/CivicLogoCInverted";

const invertTitle = "Quick Usage";

function GetLogo(props) {
  const logo = props.logoType;
  if (logo === "standardLogo") {
    return <CivicLogo alt={invertTitle} />;
  } else if (logo === "squareLogo") {
    return <CivicLogoC alt={invertTitle} />;
  } else if (logo === "standardLogoInverted") {
    return <CivicLogoInverted alt={invertTitle} />;
  } else if (logo === "squareLogoInverted") {
    return <CivicLogoCInverted alt={invertTitle} />;
  } else {
    return (
      <div>
        <p>Logo not found.</p>
      </div>
    );
  }
}

const LogosStyle = () => (
  <div style={storybookStyles.main}>
    <h1>Logos</h1>
    <h2>Quick Usage Guide</h2>
    <p>
      This quick usage guide should assist in using the appropriate logo version
      for most applications. Examples of each version in use follows.
    </p>
    <h3>Step 1: Select Orientation Type</h3>
    <p>
      Select the appropriate orientation and size for the space in which the
      logo will appear.
    </p>
    <h4>Wide</h4>
    <p>Standard go-to Logo.</p>
    <div style={storybookStyles.logo}>
      <GetLogo logoType="standardLogo" />
    </div>
    <h4>Icon</h4>
    <p>
      Use only when standard “CIVIC” logo has already been used or in some
      primary brand content where “CIVIC” is already understood by the audience.
    </p>
    <div style={storybookStyles.logo}>
      <GetLogo logoType="squareLogo" />
    </div>

    <h3>Step 2: Select Color Version</h3>
    <p>
      Select the appropriate color version for the background behind the logo.
    </p>
    <h4>Standard</h4>
    <p>Standard go-to Logo. Use on light solid-color backgrounds.</p>
    <div style={storybookStyles.logo}>
      <GetLogo logoType="standardLogo" />
    </div>

    <h4>Inverted</h4>
    <p>Use on a dark, solid-color background.</p>
    <div style={storybookStyles.invertedLogo}>
      <GetLogo logoType="standardLogoInverted" />
    </div>
    <div style={storybookStyles.invertedLogo}>
      <GetLogo logoType="squareLogoInverted" />
    </div>
  </div>
);

export default LogosStyle;
