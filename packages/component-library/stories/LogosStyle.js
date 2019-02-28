import React from 'react'; 
import { storybookStyles } from './storyStyles.js';
import CivicLogo from '../src/Logo/CivicLogo';
//import CivicLogoInverted from '../src/Logo/CivicLogoInverted';
import CivicLogoC from '../src/Logo/CivicLogoC';
//import CivicLogoCInverted from '../src/Logo/CivicLogoCInverted';

/*
  TODO:
        Create and add wide inverted logo, CivicLogoInverted.svg
        Create and add square standard and inverted logos, CivicLogoC.svg CivicLogoCInverted.svg
        Create a Logo component that will return the correct logo when used
*/

const invertTitle = "Quick Usage"

const LogosStyle = () => (
  <div style={storybookStyles.main}>
    <h1>
      Logos
    </h1>
    <h2>
      Quick Usage Guide
    </h2>
    <p>
      This quick usage guide should assist in using the appropriate logo version for most applications. Examples of each version in use follows.
    </p>
    <h3>
      Step 1: Select Orientation Type
    </h3>
    <p>
      Select the appropriate orientation and size for the space in which the logo will appear.
    </p>
    <h4>
      Wide
    </h4>
    <p>
      Standard go-to Logo.
    </p>
    <div style={storybookStyles.logo}>
      <CivicLogo alt={invertTitle} />
    </div>
    <h4>
      Icon
    </h4>
    <p>
      Use only when standard “CIVIC” logo has already been used or in some primary brand content where “CIVIC” is already understood by the audience.
    </p>
    <div>
      <CivicLogoC alt={invertTitle} />
    </div>

    <h3>
      Step 2: Select Color Version
    </h3>
    <p>
      Select the appropriate color version for the background behind the logo.
    </p>
    <h4>
      Standard
    </h4>
    <p>
      Standard go-to Logo. Use on light solid-color backgrounds.
    </p>
    <div>
      <CivicLogo alt={invertTitle} />
    </div>

    <h4>
      Inverted
    </h4>
    <p>
      Use on a dark, solid-color background.
    </p>
    <div style={storybookStyles.invertedLogo}>
      {/* <CivicLogoInverted alt={invertTitle} /> */}
    </div>
    <div style={storybookStyles.invertedLogo}>
      {/* <CivicLogoCInverted alt={invertTitle} /> */}
    </div>

  </div>
);

export default LogosStyle;