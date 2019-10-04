/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect } from "react";
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
`;

const closedStyle = css`
  transform: translateX(-100%);
`;

const openStyle = css`
  transform: translateX(0%);
`;

const headerStyle = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 4rem;
  line-height: initial;
  color: ${palette.blue};
  margin: 0;
  padding-top: 15px;
`;

const badgesContainer = css`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-content: center;
`;

const BadgesDrawer = ({ journeyBarContainerStyle }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const drawerOpenTimeout = setTimeout(() => {
      setOpen(!open);
    }, 5 * 1000);

    return () => {
      clearTimeout(drawerOpenTimeout);
    };
  }, [open]);

  return (
    <div
      css={css`
        ${journeyBarContainerStyle};
        ${drawerContainer};
        ${open ? openStyle : closedStyle};
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
  journeyBarContainerStyle: PropTypes.shape({})
};

export default BadgesDrawer;
