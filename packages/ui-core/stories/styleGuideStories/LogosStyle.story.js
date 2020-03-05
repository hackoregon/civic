import React from "react";
import { Logo } from "@hackoregon/ui-brand";
import { storybookStyles } from "../storyStyles";

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
    <p>Standard go-to Logo. Animates on initial load.</p>
    <pre>
      <code>{`<Logo />`}</code>
    </pre>
    <div style={storybookStyles.logo}>
      <Logo type="standardLogoAnimated" />
    </div>
    <h4>Icon</h4>
    <p>
      Use only when standard “CIVIC” logo has already been used or in some
      primary brand content where “CIVIC” is already understood by the audience.
    </p>
    <pre>
      <code>{`<Logo type="squareLogo" />`}</code>
    </pre>
    <div style={storybookStyles.logo}>
      <Logo type="squareLogo" />
    </div>

    <h3>Step 2: Select Color Version</h3>
    <p>
      Select the appropriate color version for the background behind the logo.
    </p>
    <h4>Standard</h4>
    <p>Standard go-to Logo. Use on light solid-color backgrounds.</p>
    <pre>
      <code>{`<Logo type="standardLogo" />`}</code>
    </pre>
    <div style={storybookStyles.logo}>
      <Logo type="standardLogo" />
    </div>

    <h4>Inverted</h4>
    <p>Use on a dark, solid-color background.</p>
    <pre>
      <code>{`<Logo type="standardLogoInverted" />`}</code>
    </pre>
    <div style={storybookStyles.invertedLogo}>
      <Logo type="standardLogoInverted" />
    </div>
    <pre>
      <code>{`<Logo type="squareLogoInverted" />`}</code>
    </pre>
    <div style={storybookStyles.invertedLogo}>
      <Logo type="squareLogoInverted" />
    </div>
    <pre>
      <code>{`<Logo type="sandboxLogoInverted" />`}</code>
    </pre>
    <div style={storybookStyles.invertedLogo}>
      <Logo type="sandboxLogoInverted" />
    </div>

    <h3>Other Logos</h3>
    <h4>Hack Oregon Logo</h4>
    <p>Used for Hack Oregon</p>
    <pre>
      <code>{`<Logo type="hackOregon" />`}</code>
    </pre>
    <div style={storybookStyles.logo}>
      <Logo type="hackOregon" />
    </div>

    <h4>CIVIC Master Builders</h4>
    <p>Used for the CIVIC Master Builders program</p>
    <pre>
      <code>{`<Logo type="masterBuilders" />`}</code>
    </pre>
    <div style={storybookStyles.logo}>
      <Logo type="masterBuilders" />
    </div>
  </div>
);

export default LogosStyle;
