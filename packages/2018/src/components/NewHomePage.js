/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";
import emotionReset from "emotion-reset";
import { Fragment } from "react";
import { Button, BrandColors } from "@hackoregon/component-library";
import HomePageStyle from "./NewHomePage.styles";
import Header from './Header';
// Placeholders
import placeholderIntroImg from "../assets/new-home-page-1.png";
import placeholderWorkImg from "../assets/new-home-page-2.png";
import placeholderContributorsImg from "../assets/new-home-page-3.png";
import placeholderPlatformImg from "../assets/new-home-page-4.png";
import placeholderCivicImg from "../assets/new-home-page-5.png";

const sectionWorkLayout = css`
  padding-bottom: 150px;
`;

const sectionContributorLayout = css`
  padding-bottom: 118px;
`;

const sectionPlatformLayout = css`
  padding-bottom: 77px;
`;

const sectionCivicLayout = css`
  padding-bottom: 186px;
`;

const HomePage = () => {
  return (
    <Fragment>
      <Global
        styles={css`
          font-size: 22px;
          ${emotionReset}
          ${HomePageStyle}
        `}
      />
      <Header />
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
          <Button margin="26px 0 0 0">EXPLORE CIVIC</Button>
        </div>

        <h2>JOIN THE MOVEMENT</h2>

        <div className="home-section" css={sectionWorkLayout}>
          <h3>Work With Us</h3>
          <h4>
            CITIES, GOVERNMENTS &<br />
            ORGANIZATIONS
          </h4>
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
          <Button margin="96px 0 53px 0" bkgndColor={BrandColors.subdued.rgba}>
            WORK WITH US
          </Button>
          <img
            className="placeholder-section-image"
            src={placeholderWorkImg}
            alt="placeholder"
          />
        </div>

        <div className="home-section" css={sectionContributorLayout}>
          <h3>Become a Contributor</h3>
          <h4>
            DESIGNERS, DEVELOPERS,
            <br />
            WRITERS & COMMUNITY MEMBERS
          </h4>
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
          <div className="section-button-container">
            <Button
              display="inline"
              margin="0 10px 0 0"
              bkgndColor={BrandColors.subdued.rgba}
            >
              APPLY NOW
            </Button>
            <Button
              display="inline"
              margin="0 0 0 0"
              bkgndColor={BrandColors.subdued.rgba}
            >
              LEARN MORE
            </Button>
          </div>
          <img
            className="placeholder-section-image"
            src={placeholderContributorsImg}
            alt="placeholder"
          />
        </div>

        <h2>ABOUT</h2>

        <div className="home-section" css={sectionPlatformLayout}>
          <h3>CIVIC Platform</h3>
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
          <h4 className="platform-h4">CIVIC IS COMPRISED OF:</h4>
          <div className="link-container">
            <a className="platform-link" href="http://service.civicpdx.org/">
              EXPLORE DATA
            </a>
            <a
              className="platform-link"
              href="https://github.com/hackoregon?type=source"
            >
              EXPLORE CODE
            </a>
            <a
              className="platform-link"
              href="https://hackoregon.github.io/civic/"
            >
              DOCUMENTATION
            </a>
          </div>
          <img
            css={css`
              margin-left: -15px;
              width: 100%;
            `}
            src={placeholderPlatformImg}
            alt="placeholder"
          />
        </div>

        <div className="home-section" css={sectionCivicLayout}>
          <h3>Civic Software Foundation</h3>
          <p>
            The CIVIC Platform is made possible by the Civic Software
            Foundation, a non-profit organization bringing data science, modern
            tech, and civic willpower together to create a force for public
            good.
          </p>
          <Button margin="40px 0 50px 0" bkgndColor={BrandColors.subdued.rgba}>
            VISIT THE CIVIC SOFTWARE FOUNDATION
          </Button>
          <p className="quote-text">
            &quot;When <span className="big-text">political will</span> meets{" "}
            <span className="big-text">public imagination</span> the technology
            we can create is unlike anything{" "}
            <span className="big-text">the world has ever seen.&quot;</span>
          </p>
          <img
            className="placeholder-section-image"
            src={placeholderCivicImg}
            alt="placeholder"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
