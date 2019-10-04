/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { palette } from "../../constants/style";

const circleStyle = css`
  height: 120px;
  width: 120px;
  border-radius: 100%;
  background-color: ${palette.gold};
  margin-right: 20px;
`;

const Badge = () => {
  return <div css={circleStyle} />;
};

export default Badge;
