/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import FullNav from "./FullNav";
import SmallNav from "./SmallNav";

const hamburgerMaxWidth = 915;

const headerWrapper = css`
  height: 115px;
  width: 100vw;
  position: fixed;
  background: #fdfdfd;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin: 0;
  top: 0;
  z-index: 100;

  @media (max-width: ${hamburgerMaxWidth}px) {
    height: 72px;
  }
`;

const Header = () => {
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
    <header css={headerWrapper}>
      {width > hamburgerMaxWidth ? <FullNav /> : <SmallNav />}
    </header>
  );
};

export default Header;
