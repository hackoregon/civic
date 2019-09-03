/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";
import emotionReset from "emotion-reset";
import { Fragment } from "react";
import { Button } from "@hackoregon/component-library";
import HomePageStyle from "./NewHomePage.styles";
// Placeholders
import placeholderIntroImg from "../assets/new-home-page-1.png";

const HomePage = () => {
  return (
    <Fragment>
      <Global
        styles={css`
          ${emotionReset}
          ${HomePageStyle}
        `}
      />
      <div className="content-wrapper">
        <h1>Civic</h1>
        <h2 className="page-subtitle">
          A system for public data, built on collaboration
        </h2>
        <div className="intro-wrapper">
          <img
            className="placeholder-intro-image"
            src={placeholderIntroImg}
            alt="placeholder"
          />
          <p className="intro-text">
            CIVIC brings technology, teamwork, and creativity together in a
            system built for the needs of institutions managing important data
            systems with public value.
          </p>
          <Button margin="26px 13px 0 0">EXPLORE CIVIC!</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
