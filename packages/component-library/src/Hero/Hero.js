import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const heroClass = css`
  display: flex;
  background: rgb(34, 15, 37);
  height: 75vh;
  min-height: 600px;
  width: 100%;
  margin: 0 0 120px;
  padding: 0;
  background-size: cover;
  background-position: center center;
  z-index: -100;
  align-items: center;
  justify-content: center;
`;

const containerClass = css`
  display: flex;
  width: 100%;
  max-width: 800px;

  @media (max-width: 640px) {
    padding: 0 15px;
  }
`;

const contentClass = css`
  position: relative;
  padding-top: 0px;
  display: flex;
  align-items: center;
  color: #fff;
`;

const DefaultChildren = () => (
  <h1>
    Data for the people,
    <br />
    by the people.
  </h1>
);

const Hero = ({ children, mainProjectColor }) => (
  <div css={heroClass} style={{ backgroundColor: mainProjectColor }}>
    <div css={containerClass}>
      <div css={contentClass}>{children || <DefaultChildren />}</div>
    </div>
  </div>
);

Hero.displayName = "Hero";

Hero.propTypes = {
  mainProjectColor: PropTypes.string,
  children: PropTypes.node
};

export default Hero;
