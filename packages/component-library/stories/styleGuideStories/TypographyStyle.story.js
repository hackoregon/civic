import React from "react";
import { storybookStyles } from "../storyStyles";

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

const paragraphStyle = {
  maxWidth: "600px"
};

const TypographyStyle = () => (
  <div style={storybookStyles.main}>
    <h1>Typography</h1>
    <h2>Fonts:</h2>
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
    <div style={fontBlockStyle}>
      <h3>Code</h3>
      <code style={fontSample}>Roboto Mono</code>
      <h4>Source: Google Fonts</h4>
    </div>
    <hr />
    <h2>Headings:</h2>
    <h1>Heading 1 Rubik</h1>
    <h2>Heading 2 Rubik</h2>
    <h3>Heading 3 Rubik</h3>
    <h4>Heading 4 Rubik</h4>
    <h5>Heading 5 Rubik</h5>
    <h6>Heading 6 Rubik</h6>
    <hr />
    <h2>Paragraphs:</h2>
    <div style={paragraphStyle}>
      <p>
        <em>Paragraphs should have a max-width of 600px or less</em>
      </p>
      <h3>Large Paragraph</h3>
      <p className="LargeParagraph">
        Large Paragraph can be used as an intro paragraph or callout within
        content. Merriweather regular 16pt. Vivamus vitae odio tempor neque
        iaculis iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia Curae; Aliquam gravida risus nibh, non rutrum
        ipsum efficitur at. Fusce volutpat nisl nec odio aliquet facilisis.
        Integer eu lacus metus. Mauris tortor lectus, pulvinar a aliquet vel,
        venenatis a diam. Vivamus et lorem feugiat, venenatis justo vel, luctus
        eros.
      </p>
      <h3>Normal Paragraph</h3>
      <p>
        Normal Paragraph should be used throughout the content by default,
        except in the case above. Merriweather regular 13pt. Vivamus vitae odio
        tempor neque iaculis iaculis. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia Curae; Aliquam gravida risus
        nibh, non rutrum ipsum efficitur at. Fusce volutpat nisl nec odio
        aliquet facilisis. Integer eu lacus metus. Mauris tortor lectus,
        pulvinar a aliquet vel, venenatis a diam. Vivamus et lorem feugiat,
        venenatis justo vel, luctus eros.
      </p>
      <h3>Action Inside a Paragraph</h3>
      <p>
        Vivamus vitae odio tempor neque iaculis iaculis. Vestibulum ante ipsum
        primis in{" "}
        <a href="https://www.youtube.com/watch?v=gJ5hbJsN7Hc">faucibus orci</a>{" "}
        luctus et ultrices posuere cubilia Curae; Aliquam gravida risus nibh,
        non rutrum ipsum efficitur at. Fusce volutpat nisl nec odio aliquet
        facilisis. Integer eu lacus metus. Mauris tortor lectus, pulvinar a
        aliquet vel, venenatis a diam. Vivamus et lorem feugiat, venenatis justo
        vel, luctus eros.
      </p>
      <h3>Action Outside a Paragraph</h3>
      <p>
        Vivamus vitae odio tempor neque iaculis iaculis. Vestibulum ante ipsum
        primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        Aliquam gravida risus nibh, non rutrum ipsum efficitur at. Fusce
        volutpat nisl nec odio aliquet facilisis. Integer eu lacus metus. Mauris
        tortor lectus, pulvinar a aliquet vel, venenatis a diam. Vivamus et
        lorem feugiat, venenatis justo vel, luctus eros.
      </p>
      <h4>
        <a href="https://www.youtube.com/watch?v=gJ5hbJsN7Hc">Read More</a>
      </h4>
      <h3>Within Visualizations, Tiny Text, or Numbers</h3>
      <p className="DataText">
        Use Roboto Condensed within visualizations and anywhere else with tiny
        text or numbers. Use Roboto Condensed Bold for headings and Roboto
        Condensed Regular everywhere else.
      </p>
      <p className="DataText">
        It is condensed (allowing more content in smaller areas) and has good
        letter spacing and form hints (really legible down to 11px on digital
        devices).
      </p>
      <p className="DataText">
        If a visualization displays larger numbers or text, feel free to use the
        heading typography, Rubik instead of Roboto Condensed.
      </p>
    </div>
    <hr />
  </div>
);

export default TypographyStyle;
