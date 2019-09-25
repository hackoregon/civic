import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Header from "../Header/Header";
import Footer from "../FooterNew/FooterNew";
import CollectionHero from "../Hero/CollectionHero";

const headerHeight = 72;

const defaultStyles = css`
  padding: 0px 24px;

  main:focus {
    outline: none;
  }
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

const headerMargin = css`
  padding-top: ${headerHeight}px;
`;

const PageLayout = ({
  header,
  heroTitle,
  heroSubtitle,
  teamTitle,
  children
}) => (
  <main id="main" tabIndex="-1" css={header && headerMargin}>
    {header && <Header />}
    {heroTitle && (
      <CollectionHero
        teamTitle={teamTitle}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
      />
    )}
    <div css={defaultStyles}>{children}</div>
    <Footer />
  </main>
);

PageLayout.displayName = "PageLayout";

PageLayout.propTypes = {
  header: PropTypes.bool,
  teamTitle: PropTypes.string,
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string,
  children: PropTypes.node
};

PageLayout.defaultProps = {
  header: true
};

export default PageLayout;
