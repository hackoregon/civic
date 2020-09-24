import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storybookStyles } from "@hackoregon/ui-docs";

// Display font type
const fontBlockStyle = {
  marginTop: "40px",
  marginBottom: "45px"
};

const fontSample = {
  fontSize: "2.25em",
  marginTop: 0,
  marginBottom: 0
};

const TypographyStyleQuickUsage = () => (
  <div style={storybookStyles.main}>
    <h1>Typography</h1>
    <h2>Quick Usage:</h2>
    <div style={fontBlockStyle}>
      <h3>Brand</h3>
      <h2 className="Brand" style={fontSample}>
        Sofia Pro
      </h2>
      <h4>Source: Adobe Typekit</h4>
    </div>
    <div style={fontBlockStyle}>
      <h3>Headings</h3>
      <h1 style={fontSample}>Rubik</h1>
      <h4>Source: Google Fonts</h4>
    </div>
    <div style={fontBlockStyle}>
      <h3>Paragraphs</h3>
      <p style={fontSample}>Merriweather</p>
      <h4>Source: Google Fonts</h4>
    </div>
    <div style={fontBlockStyle}>
      <h3>Data</h3>
      <p style={Object.assign({}, fontSample)} className="DataFont">
        Roboto Condensed
      </p>
      <h4>Source: Google Fonts</h4>
    </div>
    <hr />
  </div>
);

export default TypographyStyleQuickUsage;
