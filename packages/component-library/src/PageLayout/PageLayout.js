import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import Header from "../Navigation/Header";
import Footer from "../Footer/Footer";
import CollectionHero from "../Hero/CollectionHero";

const defaultStyles = css`
  padding: 0px 24px;
  @media (max-width: 640px) {
    padding: 0px 6px;
  }

  > p {
    width: 100%;
    max-width: 700px;
    font-size: 18px;
    margin-bottom: 1.5em;
    line-height: 1.8;

    &.transition {
      margin: 80px auto;
    }

    &.small {
      font-size: 14px;
    }
  }

  & > p,
  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    margin: auto;
    @media (max-width: 640px) {
      width: 90%;
    }
  }
`;

const PageLayout = ({
  header,
  heroTitle,
  heroSubtitle,
  mainProjectColor,
  teamTitle,
  overlay,
  children,
  attribution
}) => (
  <div>
    {header && (
      <Header
        title="Civic homepage"
        mainProjectColor={mainProjectColor}
        overlay={overlay || false}
      />
    )}
    {heroTitle && (
      <CollectionHero
        teamTitle={teamTitle}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        mainProjectColor={mainProjectColor}
      />
    )}
    <div className={defaultStyles}>{children}</div>
    <Footer attribution={attribution} />
  </div>
);

PageLayout.displayName = "PageLayout";

PageLayout.propTypes = {
  header: PropTypes.bool,
  overlay: PropTypes.bool,
  teamTitle: PropTypes.string,
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string,
  mainProjectColor: PropTypes.string,
  children: PropTypes.node,
  attribution: PropTypes.node
};

PageLayout.defaultProps = {
  header: true
};

export default PageLayout;
