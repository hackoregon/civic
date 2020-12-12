/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { BrandTheme } from "@hackoregon/ui-themes";
import { theme } from "../../../tailwind.config";

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

const BrandColorTailwindSample = ({ color, name, description, weights }) => (
  <div css={solidColorSample}>
    <div>
      {weights.map(weight => (
        <div
          css={css`
            ${colorBlock} background-color: ${color[weight]};
          `}
        />
      ))}
    </div>
    <div css={colorDescription}>
      <h4>{name}</h4>
      {weights.map(weight => (
        <p>
          {weight}: {color[weight]}
        </p>
      ))}
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

BrandColorTailwindSample.propTypes = {
  color: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  weights: PropTypes.arrayOf(PropTypes.number).isRequired
};

BrandColorSample.displayName = "BrandColorSample";
const ColorThemeStyle = () => (
  <div className="prose prose-lg">
    <h1>Color Theme</h1>
    <h2>Brand</h2>
    <BrandColorSample color={theme.colors.black} name="Black" description="" />
    <BrandColorSample color={theme.colors.white} name="White" description="" />
    <BrandColorSample color={theme.colors.brand} name="Brand" description="" />
    <BrandColorSample
      color={theme.colors.accent}
      name="Accent"
      description=""
    />

    <hr />
    <h2>Grays</h2>
    <BrandColorTailwindSample
      color={theme.colors.gray}
      name="Gray"
      description=""
      weights={[100, 200, 300, 400, 500, 600, 700, 800, 900]}
    />

    <hr />
    <h2>Categorical Colors</h2>
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
    <hr />
    <h2>Success & Error</h2>
    <BrandColorSample color={theme.colors.error} name="Error" description="" />
    <BrandColorSample
      color={theme.colors.warning}
      name="Warning"
      description=""
    />
    <BrandColorSample
      color={theme.colors.success}
      name="Success"
      description=""
    />
    <BrandColorSample
      color={theme.colors.informational}
      name="Informational"
      description=""
    />
  </div>
);

export default ColorThemeStyle;
