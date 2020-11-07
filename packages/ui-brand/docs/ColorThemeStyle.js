/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import {
  BrandColors,
  VisualizationColors,
  BrandTheme
} from "@hackoregon/ui-themes";

const solidColorSample = css`
  display: flex;
`;

const colorBlock = css`
  height: 125px;
  width: 300px;
  margin: 10px 20px 10px 0px;
`;

// TODO: Update to use template literal when global style is updated to use template literal
const colorDescription = {
  p: {
    ...BrandTheme[".DataText"]
  }
};

const BrandColorSample = ({ color, name, description }) => (
  <div css={solidColorSample}>
    <div css={css`${colorBlock} background-color: ${color.rgba};`} />
    <div css={colorDescription}>
      <h4>{name}</h4>
      <p>Hex: {color.hex}</p>
      <p>{color.rgb} </p>
      {description ? <p>{description}</p> : null}
    </div>
  </div>
);

BrandColorSample.propTypes = {
  color: PropTypes.shape({
    rgb: PropTypes.string,
    rgba: PropTypes.string,
    hex: PropTypes.string
  }).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

BrandColorSample.displayName = "BrandColorSample";

const categoricalColors = VisualizationColors.categorical;

const ColorThemeStyle = () => (
  <div>
    <h1>Color Theme</h1>
    <h2>Brand</h2>
    <BrandColorSample
      color={BrandColors.primary}
      name="Primary"
      description="Used for primary content such as logos, headings, and backgrounds."
    />
    <BrandColorSample
      color={BrandColors.secondary}
      name="Secondary"
      description="Used in the logo and for an accent color in the platform."
    />
    <BrandColorSample
      color={BrandColors.tertiary}
      name="Tertiary"
      description="Compliment to primary for paragraphs and secondary content. Currently
          same as primary."
    />
    <BrandColorSample
      color={BrandColors.medium}
      name="Medium"
      description="Used for primary brand content such as logo, headings, backgrounds."
    />
    <BrandColorSample
      color={BrandColors.subdued}
      name="Subdued"
      description="Used in logo and action color within the platform."
    />
    <BrandColorSample
      color={BrandColors.action}
      name="Action"
      description="Used for action color within the platform."
    />
    <h2>Brand: Other</h2>
    <BrandColorSample
      color={BrandColors.plumLight}
      name="Plum Light"
      description="Used in logo and action color within the platform."
    />
    <h2>Visualizations: Categorical</h2>
    <BrandColorSample color={categoricalColors.pink} name="Pink" />
    <BrandColorSample color={categoricalColors.blue} name="Blue" />
    <BrandColorSample color={categoricalColors.green} name="Green" />
    <BrandColorSample color={categoricalColors.purple} name="Purple" />
    <BrandColorSample color={categoricalColors.yellow} name="Yellow" />
  </div>
);

export default ColorThemeStyle;
