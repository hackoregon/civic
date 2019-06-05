import React from "react";
import { storybookStyles } from "../storyStyles";

const ColorThemeStyle = () => (
  <div style={storybookStyles.main}>
    <h1>Color Theme</h1>
    <h2>Brand</h2>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.primaryBkgnd
        )}
      />
      <div>
        <h4>Plum (Primary)</h4>
        <p style={storybookStyles.dataText}>Hex: #201024</p>
        <p style={storybookStyles.dataText}>rgb: 34,15,37</p>
        <p style={storybookStyles.dataText}>
          Used for primary content such as logos, headings, and backgrounds.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.secondaryBkgnd
        )}
      />
      <div>
        <h4>Salmon (Secondary)</h4>
        <p style={storybookStyles.dataText}>Hex: #EE495C</p>
        <p style={storybookStyles.dataText}>rgb: 238,73,92</p>
        <p style={storybookStyles.dataText}>
          Used in the logo and for the action color in the platform.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.tertiaryBkgnd
        )}
      />
      <div>
        <h4>Plum Light (Tertiary)</h4>
        <p style={storybookStyles.dataText}>Hex: #726371</p>
        <p style={storybookStyles.dataText}>rgb: 114,99,113</p>
        <p style={storybookStyles.dataText}>
          Compliment to primary for paragraphs and secondary content.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.mediumBkgnd
        )}
      />
      <div>
        <h4>Medium</h4>
        <p style={storybookStyles.dataText}>Hex: #AAA4AB</p>
        <p style={storybookStyles.dataText}>rgb: 170,164,171</p>
        <p style={storybookStyles.dataText}>
          Used for primary brand content such as logo, headings, backgrounds.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.subduedBkgnd
        )}
      />
      <div>
        <h4>Subdued</h4>
        <p style={storybookStyles.dataText}>Hex: #F3F2F3</p>
        <p style={storybookStyles.dataText}>rgb: 243,242,243</p>
        <p style={storybookStyles.dataText}>
          Used in logo and action color within the platform.
        </p>
      </div>
    </div>

    <h2>Visualizations: Categorical</h2>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.pinkBkgnd
        )}
      />
      <div>
        <h4>Pink</h4>
        <p style={storybookStyles.dataText}>Hex: #DC4556</p>
        <p style={storybookStyles.dataText}>rgb: 220,69,86</p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.blueBkgnd
        )}
      />
      <div>
        <h4>Blue</h4>
        <p style={storybookStyles.dataText}>Hex: #1E62BD</p>
        <p style={storybookStyles.dataText}>rgb: 30,98,189</p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.greenBkgnd
        )}
      />
      <div>
        <h4>Teal</h4>
        <p style={storybookStyles.dataText}>Hex: #19B7AA</p>
        <p style={storybookStyles.dataText}>rgb: 25,183,170</p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.purpleBkgnd
        )}
      />
      <div>
        <h4>Purple</h4>
        <p style={storybookStyles.dataText}>Hex: #721D7C</p>
        <p style={storybookStyles.dataText}>rgb: 114,29,124</p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign(
          {},
          storybookStyles.colorBlock,
          storybookStyles.yellowBkgnd
        )}
      />
      <div>
        <h4>Yellow</h4>
        <p style={storybookStyles.dataText}>Hex: #FFB226</p>
        <p style={storybookStyles.dataText}>rgb: 255,178,38</p>
      </div>
    </div>
  </div>
);

export default ColorThemeStyle;
