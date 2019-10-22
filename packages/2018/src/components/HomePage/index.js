/* eslint-disable jsx-a11y/media-has-caption */
/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";
import emotionReset from "emotion-reset";
import { Fragment } from "react";
import {
  Button,
  BrandColors,
  HeaderNew as Header,
  FooterNew as Footer
} from "@hackoregon/component-library";
import { Link } from "react-router";

import PlatformExplorer from "./PlatformExplorer";
import indexStyle, { defaultFontSize } from "./index.styles";
// Placeholders
import placeholderWorkImg from "../../assets/new-home-page-2.png";
import placeholderContributorsImg from "../../assets/new-home-page-3.png";
import test from "../../assets/test.mp4";
// import placeholderCivicImg from "../../assets/new-home-page-5.png";

const greatestWidth = 1200;
const collapseWidth = 845;
const condensedWidth = 715;

const sectionWorkLayout = css`
  padding-bottom: 120px;

  @media (min-width: ${condensedWidth}px) {
    padding-bottom: 210px;
  }
`;

const sectionContributorLayout = css`
  padding-bottom: 40px;

  @media (max-width: 662px) {
    padding-top: 135px;
  }

  @media (min-width: ${condensedWidth}px) {
    padding-bottom: 95px;
  }

  @media (min-width: ${collapseWidth}px) {
    padding-bottom: 150px;
  }
`;

const sectionPlatformLayout = css`
  padding-bottom: 35px;
  margin-bottom: 60px;

  @media (min-width: ${condensedWidth}px) {
    margin-bottom: 100px;
  }

  @media (min-width: ${collapseWidth}px) {
    margin-bottom: 160px;
  }
`;

const sectionCivicLayout = css`
  padding-bottom: 186px;
  padding-bottom: 10px;
  margin-bottom: 10px;

  @media (max-width: 787px) {
    padding-top: 80px;
  }

  @media (max-width: 460px) {
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  @media (max-width: 402px) {
    padding-top: 125px;
  }
`;

const HomePage = () => {
  return (
    <Fragment>
      <Global
        styles={css`
          font-size: 22px;
          ${emotionReset}
          ${indexStyle(greatestWidth, collapseWidth)}
        `}
      />
      <Header greatestWidth={greatestWidth} collapseWidth={collapseWidth} />
      <div className="content-wrapper">
        <h1>CIVIC</h1>
        <p className="page-subtitle">
          A system for public data, built on public collaboration
        </p>
        <div className="intro-wrapper">
          <video
            className="placeholder-intro-image"
            autoPlay
            playsInline
            muted
            loop
          >
            <source type="video/mp4" src={test} />
          </video>
          <p className="intro-text">
            CIVIC Platform is a technology environment that makes institutional
            data more accessible, enabling creative applications and analysis.
          </p>
          <div className="section-button-container">
            <Link
              css={css`
                text-decoration: none;
              `}
              to="/cards"
            >
              <Button margin="0 0 0 0">{`SEE WHAT'S POSSIBLE >`}</Button>
            </Link>
          </div>
        </div>

        <p className="section-header">JOIN THE MOVEMENT</p>

        <div className="nav-div" id="work-with-us" />
        <div className="home-section" css={sectionWorkLayout}>
          <h2>Work With Us</h2>
          <p className="audience-content">
            CITIES, GOVERNMENTS &<br />
            ORGANIZATIONS
          </p>
          <p>
            We connect resources and a nationwide network of collaborators with
            complex information challenges in the public interest to build
            projects on CIVIC’s open technology frameworks.
            <br />
            <br />
            Our vision is for public data to be available as a vital resource
            for collaboration and group problem solving -- accessible
            programatically, in common formats, with excellent documentation,
            using secure and reliable technology.
            <br />
            <br />
            The technology is only part of the challenge. Custodians of this
            data in government, nonprofit, and academia face barriers of limited
            funding, access to talent, and unique compliance.
            <br />
            <br />
            We’re building the teams and systems to make it happen.
          </p>
          <div className="section-button-container">
            <a
              css={css`
                text-decoration: none;
              `}
              href="https://ven386248.typeform.com/to/WVYtVF"
            >
              <Button bkgndColor={BrandColors.subdued.rgba}>
                WORK WITH US
              </Button>
            </a>
          </div>
          <img
            className="placeholder-section-image"
            src={placeholderWorkImg}
            alt="placeholder"
          />
        </div>

        <div className="nav-div" id="become-a-contributor" />
        <div className="home-section" css={sectionContributorLayout}>
          <h2>Become a Contributor</h2>
          <p className="audience-content">
            DESIGNERS, DEVELOPERS,
            <br />
            WRITERS & COMMUNITY MEMBERS
          </p>
          <p>
            If you’re motivated to gain experience with cutting edge industry
            technology, use your skills to give back, and work with a dream team
            of talented people, you’ll love working on CIVIC. Collaborating on a
            project is full of creative learning opportunities and experimental
            R&D.
            <br />
            <br />
            We’re looking for developers, designers, content creators, product
            managers, community organizers and more to build with us. It all
            starts by filling out an application, and we’ll be in touch when we
            have a match for a project that fits your skills and interests.
          </p>
          <div
            className="section-button-container"
            css={css`
              grid-template-columns: auto auto;
              grid-column-gap: 10px;
            `}
          >
            <a
              css={css`
                text-decoration: none;
              `}
              href="https://ven386248.typeform.com/to/rEhanV"
            >
              <Button display="inline" bkgndColor={BrandColors.subdued.rgba}>
                APPLY NOW
              </Button>
            </a>

            <a
              css={css`
                text-decoration: none;
              `}
              to="https://civicsoftwarefoundation.org/"
            >
              <Button display="inline" bkgndColor={BrandColors.subdued.rgba}>
                LEARN MORE
              </Button>
            </a>
          </div>
          <img
            className="placeholder-section-image"
            src={placeholderContributorsImg}
            alt="placeholder"
          />
        </div>

        <p className="section-header">ABOUT</p>

        <div className="nav-div" id="civic-platform" />
        <div className="home-section" css={sectionPlatformLayout}>
          <h2>CIVIC Platform</h2>
          <p>
            The CIVIC Platform is designed for making public information public
            knowledge. In order to do that, we build applications to provide a
            set of common frameworks for rapid development.
            <br />
            <br />
            CIVIC is open-source which means it’s non-proprietary, and you’re
            free to replicate or contribute to our code to develop with your own
            teams or resources. If you’ve a developer, you don’t have to join a
            team to start contributing.
          </p>
          <PlatformExplorer />
        </div>

        <div className="nav-div" id="civic-software-foundation" />
        <div className="home-section" css={sectionCivicLayout}>
          <h2
            css={css`
              @media (max-width: 787px) {
                top: -${(60 * 2) / defaultFontSize}rem;
              }
            `}
          >
            Civic Software Foundation
          </h2>
          <p className="audience-content">OUR BOTTOM LINE IS PUBLIC INTEREST</p>
          <p>
            The CIVIC Platform is made possible by the Civic Software
            Foundation, a non-profit organization bringing data science, modern
            tech, and civic willpower together to create a force for public
            good.
          </p>
          <a
            css={css`
              text-decoration: none;
            `}
            href="https://civicsoftwarefoundation.org/"
          >
            <Button
              margin="40px 0 50px 0"
              bkgndColor={BrandColors.subdued.rgba}
            >
              VISIT THE CIVIC SOFTWARE FOUNDATION
            </Button>
          </a>
          {/* <p className="quote-text">
            &quot;When <span className="big-text">political will</span> meets{" "}
            <span className="big-text">public imagination</span> the
            technology we can create is unlike anything{" "}
            <span className="big-text">the world has ever seen.&quot;</span>
          </p> */}
          {/* <img
            className="placeholder-section-image"
            src={placeholderCivicImg}
            alt="placeholder"
          /> */}
        </div>
      </div>
      <Footer
        greatestWidth={greatestWidth}
        collapseWidth={collapseWidth}
        condensedWidth={condensedWidth}
      />
    </Fragment>
  );
};

export default HomePage;
