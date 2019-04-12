import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from "emotion";
import { Link } from "react-router";
import { Logo } from "@hackoregon/component-library";

const collectionPageWrapper = css`
  position: relative;
  display: block;
  width: 100%;
  overflow-y: hidden;
  h1 {
    font-size: 60px;
    line-height: 1.2;
    font-weight: 300;
    margin-bottom: 12px;

    @media (max-width: 850px) {
      font-size: 50px;
    }
  }
`;

const leftContainer = css`
  position: fixed;
  width: 50%;
  padding: 60px;
  left: 0;
  box-sizing: border-box;

  @media (max-width: 850px) {
    position: relative;
    width: 100%;
    padding: 24px 36px;
  }
`;

const subCopy = css`
  display: block;
  font-family: "Rubik", sans-serif;
  font-size: 18px;
  line-height: 1.7;
  margin: 20px 0;
  color: black;
  letter-spacing: auto;

  @media (max-width: 850px) {
    font-size: 16px;
  }
`;

const teamTitleStyle = css`
  display: block;
  font-size: 15px;
  font-family: "Rubik";
  text-transform: uppercase;
  letter-spacing: 3px;

  @media (max-width: 850px) {
    font-size: 13px;
  }
`;

const itemStyle = css`
  background-color: #ffffff;
  h2,
  h3 {
    color: black;
  }
`;

const sideListWrapper = css`
  display: block;
  margin-top: 60px;
  margin-left: 50%;

  @media (max-width: 850px) {
    margin-left: 0;
    margin-top: 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100vh;
    background-color: white;
    min-width: 320px;
    overflow-y: scroll;

    @media (max-width: 850px) {
      overflow-y: auto;
      height: auto;
    }
  }

  li {
    height: 180px;
    padding: 20px 20px;
    margin: 20px;
    box-sizing: border-box;
    text-decoration: none;
    border: none;
    transition: opacity 0.4s ease-in-out;
    border: 1px solid #ddd;
    border-radius: 2px;
    box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);

    h2 {
      color: black;
      font-family: "Rubik", sans-serif;
      font-size: 24px;
      line-height: 1.2;

      @media (max-width: 850px) {
        font-size: 20px;
      }
    }

    :hover {
      opacity: 0.8;
    }
  }
`;

const homeLink = css`
  width: 100px;
  margin-bottom: 20px;

  a {
    border: none;
  }
`;

const PortlandCollectionPage = () => (
  <div className={collectionPageWrapper}>
    <div className={leftContainer}>
      <div className={homeLink}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <h1>Portland Collections</h1>
      <div className={subCopy}>
        Portland Collections are built by teams of volunteers who are passionate
        about showing the visual side of data to impact community awareness.
      </div>
      <div className={subCopy}>
        <a href="https://service.civicpdx.org/">Portland APIs</a>
      </div>
    </div>
    <div className={sideListWrapper}>
      <ul>
        <Link to="/sandbox">
          <li className={itemStyle}>
            <div className={teamTitleStyle}>Sandbox</div>
            <h2>Explore Interactive Maps from Portland Collections</h2>
          </li>
        </Link>
        <Link to="/cities/portland/disaster">
          <li className={itemStyle}>
            <div className={teamTitleStyle}>Disaster Resilience</div>
            <h2>
              Assessing Risk and Prioritizing Action to Strengthen Resilience in
              the Face of a Natural Disaster
            </h2>
          </li>
        </Link>
        <Link to="/cities/portland/elections">
          <li className={itemStyle}>
            <div className={teamTitleStyle}>Local Elections</div>
            <h2>
              Quantifying Influence and Understanding the Impact of Money in our
              Political System
            </h2>
          </li>
        </Link>
        <Link to="/cities/portland/housing">
          <li className={itemStyle}>
            <div className={teamTitleStyle}>Housing Affordability</div>
            <h2>
              Synthesizing Complex Information to Better Understand Affordable
              Housing Trends and Policy Dynamics
            </h2>
          </li>
        </Link>
        <Link to="/cities/portland/neighborhood">
          <li className={itemStyle}>
            <div className={teamTitleStyle}>Neighborhood Development</div>
            <h2>Examining Local Patterns, Movement, and Our Sense of Place</h2>
          </li>
        </Link>
        <Link to="/cities/portland/transportation">
          <li className={itemStyle}>
            <div className={teamTitleStyle}>Transportation Systems</div>
            <h2>Identifying Opportunities for Equitable Mobility in Cities</h2>
          </li>
        </Link>
      </ul>
    </div>
  </div>
);

PortlandCollectionPage.displayName = "PortlandCollectionPage";

export default PortlandCollectionPage;
