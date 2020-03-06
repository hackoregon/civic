import React from "react";
import { BrandColors, VisualizationColors } from "@hackoregon/ui-themes";
import { storybookStyles } from "../../src";

const categoricalColors = VisualizationColors.categorical;

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
        <h4>Primary</h4>
        <p className="DataText">Hex: {BrandColors.primary.hex}</p>
        <p className="DataText">{BrandColors.primary.rgb} </p>
        <p className="DataText">
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
        <h4>Secondary</h4>
        <p className="DataText">Hex: {BrandColors.secondary.hex}</p>
        <p className="DataText">{BrandColors.secondary.rgb} </p>
        <p className="DataText">
          Used in the logo and for an accent color in the platform.
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
        <h4>Tertiary</h4>
        <p className="DataText">Hex: {BrandColors.tertiary.hex}</p>
        <p className="DataText">{BrandColors.tertiary.rgb} </p>
        <p className="DataText">
          Compliment to primary for paragraphs and secondary content. Currently
          same as primary.
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
        <p className="DataText">Hex: {BrandColors.medium.hex}</p>
        <p className="DataText">{BrandColors.medium.rgb} </p>
        <p className="DataText">
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
        <p className="DataText">Hex: {BrandColors.subdued.hex}</p>
        <p className="DataText">{BrandColors.subdued.rgb} </p>
        <p className="DataText">
          Used in logo and action color within the platform.
        </p>
      </div>
    </div>

    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.action.rgba
        })}
      />
      <div>
        <h4>Action</h4>
        <p className="DataText">Hex: {BrandColors.action.hex}</p>
        <p className="DataText">{BrandColors.action.rgb} </p>
        <p className="DataText">Used for action color within the platform.</p>
      </div>
    </div>

    <h2>Brand: Other</h2>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: BrandColors.plumLight.rgba
        })}
      />
      <div>
        <h4>Plum Light</h4>
        <p className="DataText">Hex: {BrandColors.plumLight.hex}</p>
        <p className="DataText">{BrandColors.plumLight.rgb} </p>
        <p className="DataText">Purpose undefined</p>
      </div>
    </div>

    <h2>Visualizations: Categorical</h2>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: categoricalColors.pink.rgba
        })}
      />
      <div>
        <h4>Pink</h4>
        <p className="DataText">Hex: {categoricalColors.pink.hex}</p>
        <p className="DataText">{categoricalColors.pink.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: categoricalColors.blue.rgba
        })}
      />
      <div>
        <h4>Blue</h4>
        <p className="DataText">Hex: {categoricalColors.blue.hex}</p>
        <p className="DataText">{categoricalColors.blue.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: categoricalColors.green.rgba
        })}
      />
      <div>
        <h4>Teal</h4>
        <p className="DataText">Hex: {categoricalColors.green.hex}</p>
        <p className="DataText">{categoricalColors.green.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: categoricalColors.purple.rgba
        })}
      />
      <div>
        <h4>Purple</h4>
        <p className="DataText">Hex: {categoricalColors.purple.hex}</p>
        <p className="DataText">{categoricalColors.purple.rgb} </p>
      </div>
    </div>
    <div style={storybookStyles.solidColorSample}>
      <div
        style={Object.assign({}, storybookStyles.colorBlock, {
          backgroundColor: categoricalColors.yellow.rgba
        })}
      />
      <div>
        <h4>Yellow</h4>
        <p className="DataText">Hex: {categoricalColors.yellow.hex}</p>
        <p className="DataText">{categoricalColors.yellow.rgb} </p>
      </div>
    </div>
  </div>
);

export default ColorThemeStyle;
