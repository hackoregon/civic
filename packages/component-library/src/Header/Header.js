/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FullNav from "./FullNav";
import SmallNav from "./SmallNav";

const headerWrapper = props => css`
  height: 115px;
  width: 100vw;
  position: fixed;
  background: #fdfdfd;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin: 0;
  top: 0;
  z-index: 100;

  @media (max-width: ${props.collapseWidth}px) {
    height: 72px;
  }
`;

const Header = props => {
  const { collapseWidth } = props;
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <header css={headerWrapper(props)} {...props}>
      {width > collapseWidth ? <FullNav {...props} /> : <SmallNav {...props} />}
    </header>
  );
};

Header.propTypes = {
  greatestWidth: PropTypes.number,
  collapseWidth: PropTypes.number,
  condensedWidth: PropTypes.number
};

Header.defaultProps = {
  greatestWidth: 1200,
  collapseWidth: 845,
  condensedWidth: 715
};

Header.displayName = "Header";

export default Header;
