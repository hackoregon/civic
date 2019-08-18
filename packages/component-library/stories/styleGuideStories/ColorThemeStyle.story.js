import React from "react";
import { storybookStyles } from "../storyStyles";
import {
  BrandColors,
  CategoricalColors,
  BrandTypography
} from "../../src/_Themes/index";

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
        <p style={BrandTypography.dataText}>Hex: {BrandColors.primary.hex}</p>
        <p style={BrandTypography.dataText}>{BrandColors.primary.rgb} </p>
        <p style={BrandTypography.dataText}>
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
        <p style={BrandTypography.dataText}>Hex: {BrandColors.secondary.hex}</p>
        <p style={BrandTypography.dataText}>{BrandColors.secondary.rgb} </p>
        <p style={BrandTypography.dataText}>
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
        <p style={BrandTypography.dataText}>Hex: {BrandColors.tertiary.hex}</p>
        <p style={BrandTypography.dataText}>{BrandColors.tertiary.rgb} </p>
        <p style={BrandTypography.dataText}>
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
        <p style={BrandTypography.dataText}>Hex: {BrandColors.medium.hex}</p>
        <p style={BrandTypography.dataText}>{BrandColors.medium.rgb} </p>
        <p style={BrandTypography.dataText}>
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
        <p style={BrandTypography.dataText}>Hex: {BrandColors.subdued.hex}</p>
        <p style={BrandTypography.dataText}>{BrandColors.subdued.rgb} </p>
        <p style={BrandTypography.dataText}>
          Used in logo and action color within the platform.
        </p>
      </div>
    </div>

    <h2>Visualizations: Categorical</h2>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: CategoricalColors.pink.rgba
        })}
      />
      <div>
        <h4>Pink</h4>
        <p style={BrandTypography.dataText}>
          Hex: {CategoricalColors.pink.hex}
        </p>
        <p style={BrandTypography.dataText}>{CategoricalColors.pink.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: CategoricalColors.blue.rgba
        })}
      />
      <div>
        <h4>Blue</h4>
        <p style={BrandTypography.dataText}>
          Hex: {CategoricalColors.blue.hex}
        </p>
        <p style={BrandTypography.dataText}>{CategoricalColors.blue.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: CategoricalColors.green.rgba
        })}
      />
      <div>
        <h4>Teal</h4>
        <p style={BrandTypography.dataText}>
          Hex: {CategoricalColors.green.hex}
        </p>
        <p style={BrandTypography.dataText}>{CategoricalColors.green.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: CategoricalColors.purple.rgba
        })}
      />
      <div>
        <h4>Purple</h4>
        <p style={BrandTypography.dataText}>
          Hex: {CategoricalColors.purple.hex}
        </p>
        <p style={BrandTypography.dataText}>{CategoricalColors.purple.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: CategoricalColors.yellow.rgba
        })}
      />
      <div>
        <h4>Yellow</h4>
        <p style={BrandTypography.dataText}>
          Hex: {CategoricalColors.yellow.hex}
        </p>
        <p style={BrandTypography.dataText}>{CategoricalColors.yellow.rgb} </p>
      </div>
    </div>
  </div>
);

export default ColorThemeStyle;
