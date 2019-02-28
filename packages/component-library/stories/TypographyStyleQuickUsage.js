import React from 'react'; 
import { storybookStyles } from './storyStyles.js';

const fontBlockStyle = {
  marginTop: '40px',
  marginBottom: '45px',
}

const TypographyStyleQuickUsage = () => (
  <div style={storybookStyles.main}>
    <h1>
      Typography
    </h1>
    <h2>
      Quick Usage:
    </h2>
    <div style={fontBlockStyle}>
      <h3>
        Brand
      </h3>
      {/* is there a css class named Brand?  Where is it? Make sure this is correct. */}
      <h2 className="Brand" style={storybookStyles.fontSample}>
        Sofia Pro
      </h2>
      <h4>
        Source: Adobe Typekit
      </h4>
    </div>
    <div style={fontBlockStyle}>
      <h3>
        Headings
      </h3>
      <h1 style={storybookStyles.fontSample}>
        Rubik
      </h1>
      <h4>
        Source: Google Fonts
      </h4>
    </div>
    <div style={fontBlockStyle}>
      <h3>
        Paragraphs
      </h3>
      <p style={storybookStyles.fontSample}>
        Merriweather
      </p>
      <h4>
        Source: Google Fonts
      </h4>
    </div>
    <div style={fontBlockStyle}>
      <h3>
        Data (update to show correct font type)
      </h3>
      {/* is there a css class named Data?  Where is it? */}
      <p className="Data" style={storybookStyles.fontSample}>
        Roboto Condensed
      </p>
      <h4>
        Source: Google Fonts
      </h4>
    </div> 
    <hr />
  </div>
);

export default TypographyStyleQuickUsage;