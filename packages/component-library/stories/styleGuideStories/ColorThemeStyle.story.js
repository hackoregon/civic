import React from "react";
import { storybookStyles } from "../storyStyles";
import { BrandColors } from "../../src/_Themes/index";

const ColorThemeStyle = () => (
  <div style={storybookStyles.main}>
    <h1>Color Theme</h1>
    <h2>Brand</h2>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.primary.rgba
        })}
      />
      <div>
        <h4>Plum (Primary)</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.primary.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.primary.rgb} </p>
        <p style={storybookStyles.dataText}>
          Used for primary content such as logos, headings, and backgrounds.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.secondary.rgba
        })}
      />
      <div>
        <h4>Salmon (Secondary)</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.secondary.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.secondary.rgb} </p>
        <p style={storybookStyles.dataText}>
          Used in the logo and for the action color in the platform.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.tertiary.rgba
        })}
      />
      <div>
        <h4>Plum Light (Tertiary)</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.tertiary.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.tertiary.rgb} </p>
        <p style={storybookStyles.dataText}>
          Compliment to primary for paragraphs and secondary content.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.medium.rgba
        })}
      />
      <div>
        <h4>Medium</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.medium.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.medium.rgb} </p>
        <p style={storybookStyles.dataText}>
          Used for primary brand content such as logo, headings, backgrounds.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.subdued.rgba
        })}
      />
      <div>
        <h4>Subdued</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.subdued.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.subdued.rgb} </p>
        <p style={storybookStyles.dataText}>
          Used in logo and action color within the platform.
        </p>
      </div>
    </div>

    <h2>Visualizations: Categorical</h2>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.pink.rgba
        })}
      />
      <div>
        <h4>Pink</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.pink.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.pink.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.blue.rgba
        })}
      />
      <div>
        <h4>Blue</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.blue.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.blue.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.green.rgba
        })}
      />
      <div>
        <h4>Teal</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.green.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.green.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.purple.rgba
        })}
      />
      <div>
        <h4>Purple</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.purple.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.purple.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.yellow.rgba
        })}
      />
      <div>
        <h4>Yellow</h4>
        <p style={storybookStyles.dataText}>Hex: {BrandColors.yellow.hex}</p>
        <p style={storybookStyles.dataText}>{BrandColors.yellow.rgb} </p>
      </div>
    </div>
  </div>
);

export default ColorThemeStyle;
