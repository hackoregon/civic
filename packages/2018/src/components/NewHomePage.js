/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const coolHeader = css`
  color: blue;
`;

const HomePage = () => {
  return <h1 css={coolHeader}>New Home Page</h1>;
};

export default HomePage;
