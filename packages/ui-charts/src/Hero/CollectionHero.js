import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Hero from "./Hero";

const teamTitleStyle = css`
  display: block;
  font-size: 13px;
  font-family: "Rubik", sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const titleStyle = css`
  font-size: 50px;
  line-height: 1.2;
  font-weight: 300;
  font-family: "Rubik", sans-serif;
  margin-bottom: 12px;
  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const CollectionHero = ({ heroTitle, heroSubtitle, teamTitle }) => (
  <Hero>
    <div>
      <span css={teamTitleStyle}>{teamTitle}</span>
      <h1 css={titleStyle}>{heroTitle}</h1>
      <h2>{heroSubtitle}</h2>
    </div>
  </Hero>
);

CollectionHero.propTypes = {
  teamTitle: PropTypes.string,
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string
};

export default CollectionHero;
