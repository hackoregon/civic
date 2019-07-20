/* Not currently used, updated and moved to 2018 package */
/* eslint-disable */

import React from "react";
import { cx, css } from "emotion";
import window from "global/window";

import { Header, Footer } from "@hackoregon/component-library";
import CanvasParticles from "./CanvasParticles";
import DataList from "./DataList";
import SearchBar from "./SearchBar";

import logo from "../../assets/civic-logo-animated.svg";
import smallLogo from "../../assets/civic-logo-c.svg";
import brain from "../../assets/brain.svg";
import brainMobile from "../../assets/brain-mobile.svg";
import trees from "../../assets/trees.png";
import hackOregonLogo from "../../assets/hack-oregon-logo.png";
import heartMail from "../../assets/heartmail.png";
import twitterLogo from "../../assets/twitter-logo.png";

import cities from "./cities";
import zipCodes from "./zipCodes.json";

const searchTitle = css`
  font-family: "Rubik", sans-serif;
  text-align: left;
  font-size: 18px;
  color: white;
  margin: 0 auto;
`;
const searchSubTitle = css`
  font-family: "Rubik", sans-serif;
  font-weight: 400;
  font-size: 16px;
  font-style: italic;
  color: #aaa4ab;
  margin: 0;
`;
const logoWrapper = css`
  position: relative;
  margin: 0;
  padding: 30px 0px 20px;
  width: 160px;
`;
const missionStatementTitle = css`
  font-family: "Rubik", sans-serif;
  text-align: left;
  font-size: 50px;
  line-height: 1.2;
  width: 100%;
  letter-spacing: -2px;
  margin: 0;
`;
const missionStatement = css`
  font-size: 20px;
  line-height: 1.8;
  font-family: "Rubik", sans-serif;
  width: 100%;
  margin: 25px 0;
  max-width: 1000px;
  text-align: left;
  color: #001732;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;
const appWrapper = css`
  background-color: #ffffff;
  padding: 0px;
  height: auto;
  box-sizing: border-box;
`;
const contentWrapper = css`
  position: relative;
`;
const lookupWrapper = css`
  margin-top: 148px;
  background-color: #240f27;
  padding: 40px;
  width: 100%;
  max-width: 320px;
  position: absolute;
  top: 0;
  right: 9%;
  box-shadow: 14px 30px 60px 9px #0f18287a;

  ::before {
    content: "";
    width: 100%;
    border-bottom: solid 8px #ef495c;
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    max-width: 270px;
    right: 6%;
  }

  @media (max-width: 850px) {
    position: relative;
    max-width: none;
    width: 100%;
    top: 0;
    right: 0;
    box-sizing: border-box;
    margin-bottom: 100px;
  }
`;
const collectionsLink = css`
  display: block;
  font-family: "Rubik";
  font-size: 16px;
  position: absolute;
  top: 70px;
  right: 9%;
  margin: 0;

  a {
    color: #240f27;
    text-decoration: none;
    border-bottom: none;
    :hover {
      color: #240f27;
      text-decoration: underline;
    }
  }

  @media (max-width: 850px) {
    right: 3%;
  }
`;
const leftContainer = css`
  display: block;
  box-sizing: border-box;
  position: relative;
  padding-left: 70px;
  width: 50%;

  @media (max-width: 850px) {
    width: 100%;
    padding: 0 36px;
  }
`;
const topBar = css`
  position: relative;
  width: 100%;
  height: 25px;
  background-color: #240f27;
`;
const ctaStyle = css`
  color: #ed485b;
  font-family: "Rubik";
  font-size: 18px;
  font-style: italic;

  a {
    text-decoration: none;
    border: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
const citySkyline = css`
  margin-top: 40px;
  margin-bottom: 120px;
`;
const aboutCivicWrapper = css`
  background-color: white;
  height: 100%;
  color: white;
`;
const sectionHeaderWrapper = css`
  width: 100%;
  display: block;
  position: relative;
  background-color: #250f28;
  padding: 60px 15%;
  box-sizing: border-box;

  @media (max-width: 850px) {
    padding: 60px 10%;
  }
`;
const sectionRightContainer = css`
  width: 90%;
  display: inline-block;
  position: relative;
  vertical-align: top;
  padding: 0 20px;
  box-sizing: border-box;
`;
const sectionHeaderTitle = css`
  color: white;
  font-family: "Rubik", sans-serif;
  font-size: 50px;
  letter-spacing: -1px;
  text-align: left;
  line-height: 1.2;
  padding: 0px;
  display: block;
  position: relative;
  box-sizing: border-box;
`;
const sectionHeaderSubtitle = css`
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  color: white;
  display: inline-block;
`;
const sectionContentWrapper = css`
  background-color: #250f28;
  color: black;
  position: relative;
`;
const one = css`
  background-color: white;
`;
const smallLogoWrapper = css`
  display: inline-block;
  position: relative;
  width: 10%;
  min-width: 40px;
  img {
    width: 100%;
  }
`;
const contentLeftContainer = css`
  display: inline-block;
  width: 50%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  vertical-align: top;
  padding: 80px 6%;

  @media (max-width: 850px) {
    width: 100%;
  }
`;
const contentRightContainer = css`
  display: inline-block;
  width: 50%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  vertical-align: top;
  padding: 80px 6%;

  @media (max-width: 850px) {
    width: 100%;
  }
`;
const listTitle = css`
  display: block;
  font-family: "Rubik", sans-serif;
  font-size: 35px;
  margin: 40px 0;
  text-align: center;
`;
const listSubTitle = css`
  display: block;
  font-family: "Rubik", sans-serif;
  font-size: 24px;
  margin: 12px 0;
`;
const listText = css`
  display: block;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  color: black;
  line-height: 1.5;
`;
const brainWrapper = css`
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 10;

  @media (max-width: 850px) {
    display: none;
  }
`;
const brainWrapperMobile = css`
  display: none;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 10;

  @media (max-width: 850px) {
    display: block;
    img {
      width: 78vw;
      max-width: 500px;
    }
  }
`;
const centered = css`
  text-align: center;
`;
const salmonBackground = css`
  background-color: #ef495c;
`;
const leftThirdWrapper = css`
  display: inline-block;
  width: 33.3333333%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  vertical-align: top;
  padding: 100px 3%;
  background-color: #250f28;
  color: white;
  min-height: 100vh;

  a {
    border: none;
  }

  p {
    color: white;
    line-height: 1.5;
  }

  @media (max-width: 850px) {
    width: 100%;
  }
`;
const rightThirdWrapper = css`
  display: inline-block;
  width: 66.66666666%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  vertical-align: top;
  padding: 100px 3%;
  background-color: white;

  a {
    border: none;
    :hover {
      cursor: pointer;
    }
  }

  @media (max-width: 850px) {
    width: 100%;
  }
`;
const treesBackground = css`
  background: url(${trees}) center no-repeat;
  background-size: cover;
`;
const hackOregonLogoWrapper = css`
  text-align: right;
`;
const buttonStyle = css`
  border: 2px solid #ef495c;
  padding: 10px 20px;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  color: #ef495c;
  background-color: transparent;
  margin: 10px 0px 50px;

  :hover {
    cursor: pointer;
  }
`;
const talkToUs = css`
  & > div {
    text-align: left;
  }
`;
const iconAndTextWrapper = css`
  box-sizing: border-box;
  display: inline-block;
  width: 33.333333%;
  height: 200px;
  vertical-align: top;
  margin-top: 60px;

  @media (max-width: 850px) {
    width: 100%;
    text-align: center;
    height: auto;
    text-align: center !important;
  }

  span {
    font-family: "Rubik", sans-serif;
    font-size: 16px;
    display: block;
    margin-top: 20px;
  }
`;
const donateButton = css`
  margin: 0;
`;

class LandingPage extends React.Component {
  state = {
    city: "Portland",
    state: "OR",
    imgPath: "portland"
  };

  componentDidMount() {
    // Used to fade in the page
    this.node.style.opacity = 0;
    window.requestAnimationFrame(() => {
      this.node.style.transition = "opacity 2500ms";
      this.node.style.opacity = 1;
    });
  }

  handleSearch = input => {
    const key = input ? input.toLowerCase() : "";
    const cityResult = cities[key];

    if (cityResult) {
      return this.setState({
        city: cityResult.name,
        state: cityResult.state,
        imgPath: cityResult.path
      });
    }

    const zipResult = zipCodes[key];

    if (zipResult) {
      const cityData = zipResult.city
        ? cities[zipResult.city.toLowerCase()]
        : {};
      return this.setState({
        city: cityData ? cityData.name : zipResult.city,
        state: zipResult.state,
        imgPath: cityData ? cityData.path : "portland"
      });
    }

    return null;
  };

  render() {
    const { city, state, imgPath } = this.state;
    const cityPath = require(`../../assets/cities/${imgPath ||
      "portland"}.png`);

    return (
      <div
        className={appWrapper}
        ref={node => {
          this.node = node;
        }}
      >
        <CanvasParticles />
        <div className={contentWrapper}>
          <Header title="Civic" />

          {this.props.children}

          <div className={aboutCivicWrapper} id="aboutCivic">
            <div className={sectionHeaderWrapper}>
              <div className={smallLogoWrapper}>
                <img src={smallLogo} />
              </div>
              <div className={sectionRightContainer}>
                <div className={sectionHeaderTitle}>
                  CIVIC Software Foundation
                </div>
                <div className={sectionHeaderSubtitle}>
                  CIVIC is a fully open source project. The Civic Software
                  Foundation supports a network of people, cities, and
                  organizations who are dedicated to innovating on the CIVIC
                  Platform.
                </div>
              </div>
            </div>
            <div className={cx(sectionContentWrapper, one)}>
              <div className={contentLeftContainer}>
                <div className={listTitle}>Supporting People</div>
                <div className={listSubTitle}>Vision</div>
                <p className={listText}>
                  Empowering cities to create technology that is a reflection of
                  their ambition, their values, and their priorities.
                </p>
                <div className={listSubTitle}>Workflow</div>
                <p className={listText}>
                  Bringing our experience to existing partnerships to reshape
                  and modernize current infrastructure and create a process to
                  ensure sustainable outcomes.
                </p>
                <div className={listSubTitle}>Tactics</div>
                <p className={listText}>
                  Helping teams solve technical challenges with proven
                  implementation strategies.
                </p>
              </div>
              <div className={brainWrapper}>
                <img src={brain} />
              </div>
              <div className={brainWrapperMobile}>
                <img src={brainMobile} />
              </div>
              <div className={contentRightContainer}>
                <div className={listTitle}>Supporting Technology</div>
                <div className={listSubTitle}>Open Data</div>
                <p className={listText}>
                  Lowering the barrier to entry for information to be accessible
                  and secure from the internet so data can be actionable in many
                  ways.
                </p>
                <div className={listSubTitle}>Open Code</div>
                <p className={listText}>
                  Designing for maximum interoperability between systems with
                  reproducible standards that are built to scale.
                </p>
                <div className={listSubTitle}>Open Outcomes</div>
                <p className={listText}>
                  Enabling transparency in analytical models with live data
                  sources that power shareable visualizations on the web.
                </p>
              </div>
            </div>
          </div>

          <div className={aboutCivicWrapper} id="getStarted">
            <div className={cx(sectionHeaderWrapper, salmonBackground)}>
              <div className={cx(sectionHeaderTitle, centered)}>
                CIVIC is made by people.
              </div>
            </div>
            <div className={sectionContentWrapper}>
              <div className={leftThirdWrapper}>
                <div className={listTitle}>Membership Model for Cities</div>
                <p className={listText}>
                  The code for CIVIC is open source and free, but we recognize
                  cities will be most successful through a supported process.
                </p>
                <p className={listText}>
                  We have resources to help navigate the technical challenges
                  and strategic opportunities that facilitate long-term goals
                  for cities engaging with modern data systems.
                </p>
                <p className={listText}>
                  We’re announcing a call to action for cities who want to work
                  closely with people who are building the CIVIC Platform to
                  become members and benefit from hands-on collaboration with
                  our partner network.
                </p>
                <a href="http://hackoregon.org/membership">
                  <button className={buttonStyle}>
                    Start the conversation
                  </button>
                </a>
              </div>
              <div className={rightThirdWrapper}>
                <div className={listTitle}>Get Involved ✨</div>
                <div className={listSubTitle}>
                  Teamwork and building on CIVIC
                </div>
                <p className={listText}>
                  You can help make CIVIC! We’re actively building focus teams
                  across the country to develop new stories, new features, and
                  better functionality on the platform. If you’re interested in
                  collaborating with the people who are creating CIVIC, we’d
                  love to talk to you.
                </p>
                <a href="http://hackoregon.org/joinacivicteam" target="_blank">
                  <button className={buttonStyle}>Apply now</button>
                </a>
                <div className={listSubTitle}>
                  Collaborate as an industry partner
                </div>
                <p className={listText}>
                  We work with a variety of companies and organizations
                  dedicated to empowering data driven innovation in cities. It’s
                  important that CIVIC includes diverse perspectives across
                  industry sectors whether or not you have experience working
                  with government or software. Start the conversation by
                  applying to join our network.
                </p>
                <a href="http://hackoregon.org/joinacivicteam" target="_blank">
                  <button className={buttonStyle}>Apply now</button>
                </a>
              </div>
            </div>
          </div>

          <div className={aboutCivicWrapper} id="aboutCivic">
            <div className={cx(sectionHeaderWrapper, treesBackground)}>
              <div className={cx(sectionHeaderTitle, hackOregonLogoWrapper)}>
                <img src={hackOregonLogo} width="300" />
              </div>
            </div>
            <div className={sectionContentWrapper}>
              <div className={cx(rightThirdWrapper, talkToUs)}>
                <div className={listTitle}>Talk to us</div>
                <div className={listSubTitle}>
                  <a href="mailto:hi@civicsoftwarefoundation.org">
                    hi@civicsoftwarefoundation.org
                  </a>
                </div>
                <div className={listTitle}>
                  CIVIC launched to the world June 21st, 2018 at Hack Oregon’s
                  live Demo Day in Portland, Oregon.
                </div>
                <div className={listText}>
                  Please be patient while our website is under construction and
                  stay tuned as we are able to share new things from the CIVIC
                  Software Foundation.
                </div>
                <div className={iconAndTextWrapper}>
                  <img src={heartMail} width="60" />
                  <span>Subscribe for updates!</span>
                </div>
                <div className={iconAndTextWrapper}>
                  <a href="https://secure.squarespace.com/checkout/donate?donatePageId=551721b2e4b057e153f5c1cc">
                    <button className={cx(buttonStyle, donateButton)}>
                      Donate
                    </button>
                  </a>
                  <span>Help us continue to maintain and develop CIVIC.</span>
                </div>
                <div className={iconAndTextWrapper}>
                  <img src={twitterLogo} width="40" />
                  <span>
                    <a href="https://twitter.com/civicsoftware">
                      @civicsoftware
                    </a>
                    <br /> #CIVIC4Lyfe
                  </span>
                </div>
              </div>
              <div className={leftThirdWrapper}>
                <div className={listTitle}>
                  CIVIC was developed by Hack Oregon.
                </div>
                <p className={listText}>
                  The original concept, design, and source code for the CIVIC
                  platform was developed by volunteer teams at Hack Oregon, a
                  rapid-prototyping lab dedicated to creating open data projects
                  that bring insight to local information challenges.
                </p>
                <p className={listText}>
                  Hack Oregon is a non-profit program of the CIVIC Software
                  Foundation.
                </p>
                <p className={listText}>
                  If you live in Portland, you can volunteer to join a team for
                  our next cycle.
                </p>
                <a href="http://hackoregon.org/civicpdx">
                  <button className={buttonStyle}>Learn more</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
