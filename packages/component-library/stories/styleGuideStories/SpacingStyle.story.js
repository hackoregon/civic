/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Box } from "@material-ui/core";
import { storybookStyles } from "../storyStyles";
import { BrandColors } from "../../src";

const bg = p => css`
  box-shadow: inset ${p}px ${p}px 0 ${BrandColors.primary.hex},
    inset -${p}px -${p}px ${BrandColors.primary.hex};
  background-color: ${BrandColors.subdued.hex};
`;

// eslint-disable-next-line
const BoxWithBg = props => <Box css={bg(props.padPx)} {...props} />;

const SpacingStyle = () => (
  <div style={storybookStyles.main}>
    <h1>Spacing</h1>
    <hr />
    <h2>Padding</h2>
    <BoxWithBg>Box Default</BoxWithBg>
    <BoxWithBg my={2} p={0} padPx={0}>
      Box Padding 0
    </BoxWithBg>
    <BoxWithBg my={2} p={1} padPx={8}>
      Box Padding 1
    </BoxWithBg>
    <BoxWithBg my={2} p={2} padPx={16}>
      Box Padding 2
    </BoxWithBg>
    <BoxWithBg my={2} p={3} padPx={24}>
      Box Padding 3
    </BoxWithBg>
    <BoxWithBg my={2} p={4} padPx={32}>
      Box Padding 4
    </BoxWithBg>
    <BoxWithBg my={2} p={6} padPx={48}>
      Box Padding 6
    </BoxWithBg>
    <BoxWithBg my={2} p={8} padPx={64}>
      Box Padding 8
    </BoxWithBg>
    <h2>Margin</h2>
    <BoxWithBg my={0} textAlign="center">
      Margin 0
    </BoxWithBg>
    <BoxWithBg my={1} textAlign="center">
      Margin 1
    </BoxWithBg>
    <BoxWithBg my={2} textAlign="center">
      Margin 2
    </BoxWithBg>
    <BoxWithBg my={3} textAlign="center">
      Margin 3
    </BoxWithBg>
    <BoxWithBg my={4} textAlign="center">
      Margin 4
    </BoxWithBg>
    <BoxWithBg my={6} textAlign="center">
      Margin 6
    </BoxWithBg>
    <BoxWithBg my={8} textAlign="center">
      Margin 8
    </BoxWithBg>
  </div>
);

export default SpacingStyle;
