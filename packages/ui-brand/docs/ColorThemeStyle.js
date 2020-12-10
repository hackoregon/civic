/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import {
  BrandColors,
  VisualizationColors,
  BrandTheme
} from "@hackoregon/ui-themes";
import { theme } from "../../../tailwind.config.js";

console.log(theme);

const solidColorSample = css`
  display: flex;
  margin: 10px 20px 10px 0px;
`;

const colorBlock = css`
  height: 125px;
  width: 300px;
  margin: 0 20px 0 0px;
`;

// TODO: Update to use template literal when global style is updated to use template literal
const colorDescription = {
  p: {
    ...BrandTheme[".DataText"]
  }
};

const BrandColorSample = ({ color, name, description }) => (
  <div css={solidColorSample}>
    <div
      css={css`
        ${colorBlock} background-color: ${color};
      `}
    />
    <div css={colorDescription}>
      <h4>{name}</h4>
      <p>Hex: {color}</p>
      {description ? <p>{description}</p> : null}
    </div>
  </div>
);

const BrandColorShadedSample = ({ color, name, description }) => (
  <div css={solidColorSample}>
    <div>
      <div
        css={css`
          ${colorBlock} background-color: ${color.light};
        `}
      />
      <div
        css={css`
          ${colorBlock} background-color: ${color.DEFAULT};
        `}
      />
      <div
        css={css`
          ${colorBlock} background-color: ${color.dark};
        `}
      />
    </div>
    <div css={colorDescription}>
      <h4>{name}</h4>
      <p>Light: {color.light}</p>
      <p>Default: {color.DEFAULT}</p>
      <p>Dark: {color.dark}</p>
      {description ? <p>{description}</p> : null}
    </div>
  </div>
);

BrandColorSample.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

BrandColorShadedSample.propTypes = {
  color: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

BrandColorSample.displayName = "BrandColorSample";

const categoricalColors = VisualizationColors.categorical;

const ColorThemeStyle = () => (
  <div>
    <h1>Color Theme</h1>
    <h2>Brand</h2>
    <BrandColorSample color={theme.colors.black} name="Black" description="" />
    <BrandColorSample color={theme.colors.white} name="White" description="" />
    <BrandColorSample
      color={theme.colors.accent}
      name="Accent"
      description=""
    />

    <hr />

    <BrandColorShadedSample
      color={theme.colors.gray}
      name="Gray"
      description=""
    />
    <BrandColorShadedSample
      color={theme.colors.red}
      name="Red"
      description=""
    />
    <BrandColorShadedSample
      color={theme.colors.blue}
      name="Blue"
      description=""
    />
    <BrandColorShadedSample
      color={theme.colors.green}
      name="Green"
      description=""
    />
    <BrandColorShadedSample
      color={theme.colors.purple}
      name="Purple"
      description=""
    />
    <BrandColorShadedSample
      color={theme.colors.yellow}
      name="Yellow"
      description=""
    />
  </div>
);

export default ColorThemeStyle;
