/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { palette } from "../../../constants/style";
import Badge from "../Badge";

const drawerContainer = css`
  width: 700px;
  background-color: ${palette.lemon};
  grid-template-columns: repeat(2, auto);
  padding-left: 200px;
  margin-left: -130px;
  z-index: unset;
  transition: transform 1s;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.15);
`;

const closedStyle = css`
  transform: translateX(-100%);
`;

const openStyle = css`
  transform: translateX(0%);
`;

const summaryStyle = css`
  padding-left: 0;
  margin-left: 0;
  z-index: 10;
  transition: none;
  transform: none;

  display: grid;
  grid-template-columns: repeat(2, auto);
  padding: 0 80px;
  border-radius: 80px;
  align-content: center;
  justify-content: space-between;
  justify-self: end;
  height: 130px;
`;

const headerStyle = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 3.75rem;
  line-height: initial;
  color: ${palette.blue};
  margin: 0;
`;

const badgesContainer = css`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-content: center;
`;

const BadgesDrawer = ({ journeyBarContainerStyle, open, isSummary }) => {
  return (
    <div
      css={css`
        ${journeyBarContainerStyle};
        ${drawerContainer};
        ${open ? openStyle : closedStyle};
        ${isSummary ? summaryStyle : ""};
      `}
    >
      <p css={headerStyle}>
        Badges
        <br />
        Earned
      </p>
      <div css={badgesContainer}>
        <Badge />
        <Badge />
        <Badge />
      </div>
    </div>
  );
};

BadgesDrawer.propTypes = {
  journeyBarContainerStyle: PropTypes.shape({}),
  open: PropTypes.bool,
  isSummary: PropTypes.bool
};

export default BadgesDrawer;
