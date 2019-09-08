/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import FullNav from "./FullNav";

const headerWrapper = css`
  height: 115px;
  width: 100vw;
  position: fixed;
  background: #fdfdfd;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin: 0;
  top: 0;
  z-index: 100;
`;

const Header = () => {
  return (
    <header css={headerWrapper}>
      <FullNav />
    </header>
  );
};

export default Header;
