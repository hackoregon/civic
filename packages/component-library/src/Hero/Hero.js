import React from 'react';
import { css } from 'emotion';

const heroClass = css`
  display: flex;
  background: rgb(34, 15, 37);
  height: 75vh;
  min-height: 420px;
  width: 100%;
  margin: 0;
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

  & > h1 {
    font-size: 3em;
    line-height: 1.25em;
    color: #FFF;
    font-weight: 100;
  }
`;

const DefaultChildren = () => (
  <h1>Data for the people,<br />by the people.</h1>
);

const Hero = ({ children }) => (
  <div className={heroClass}>
    <div className={containerClass}>
      <div className={contentClass}>
        {children || <DefaultChildren />}
      </div>
    </div>
  </div>
);

Hero.displayName = 'Hero';

Hero.propTypes = {
  children: React.PropTypes.node,
};

export default Hero;
