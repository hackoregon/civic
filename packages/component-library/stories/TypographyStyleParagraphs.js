import React from 'react'; 
import { storybookStyles } from './storyStyles.js';

const fontBlockStyle = {
  marginTop: '40px',
  marginBottom: '45px',
}

const TypographyStyleParagraphs = () => (
  <div style={storybookStyles.main}>
    <h2>
      Paragraphs:
    </h2>
    <h3>
        Large Paragraph (NOTE: Where is the global style for large paragraph?)
    </h3>
    <p>
        Large Paragraph can be used as an intro paragraph or callout within content. Merriweather regular 16pt. Vivamus vitae odio tempor neque iaculis iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam gravida risus nibh, non rutrum ipsum efficitur at. Fusce volutpat nisl nec odio aliquet facilisis. Integer eu lacus metus. Mauris tortor lectus, pulvinar a aliquet vel, venenatis a diam. Vivamus et lorem feugiat, venenatis justo vel, luctus eros. 
    </p>
    <h3>
        Normal Paragraph
    </h3>
    <p>
        Normal Paragraph should be used throughout the content by default, except in the case above. Merriweather regular 13pt. Vivamus vitae odio tempor neque iaculis iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam gravida risus nibh, non rutrum ipsum efficitur at. Fusce volutpat nisl nec odio aliquet facilisis. Integer eu lacus metus. Mauris tortor lectus, pulvinar a aliquet vel, venenatis a diam. Vivamus et lorem feugiat, venenatis justo vel, luctus eros. 
    </p>
    <h3>
        Action Inside a Paragraph
    </h3>
    <p>
        Vivamus vitae odio tempor neque iaculis iaculis. Vestibulum ante ipsum primis in <a>faucibus orci</a> luctus et ultrices posuere cubilia Curae; Aliquam gravida risus nibh, non rutrum ipsum efficitur at. Fusce volutpat nisl nec odio aliquet facilisis. Integer eu lacus metus. Mauris tortor lectus, pulvinar a aliquet vel, venenatis a diam. Vivamus et lorem feugiat, venenatis justo vel, luctus eros.
    </p>
    <h3>
        Action Outside a Paragraph
    </h3>
    <p>
        Vivamus vitae odio tempor neque iaculis iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam gravida risus nibh, non rutrum ipsum efficitur at. Fusce volutpat nisl nec odio aliquet facilisis. Integer eu lacus metus. Mauris tortor lectus, pulvinar a aliquet vel, venenatis a diam. Vivamus et lorem feugiat, venenatis justo vel, luctus eros. 
    </p>
    <h4>
        <a>Read More</a>
    </h4>
    <h3>
        Within Visualizations, Tiny Text, or Numbers
    </h3>
    <p>
        Use Roboto Condensed within visualizations and anywhere else with tiny text or numbers. Use Roboto Condensed Bold for headings and Roboto Condensed Regular everywhere else.
    </p>
    <p>
        It is condensed (allowing more content in smaller areas) and has good letter spacing and form hints (really legible down to 11px on digital devices).
    </p>
    <p>
        If a visualization displays larger numbers or text, feel free to use the heading typography, Rubik instead of Roboto Condensed.
    </p>
    <hr />
  </div>
);

export default TypographyStyleParagraphs;