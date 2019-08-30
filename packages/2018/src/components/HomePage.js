import { Component } from "react";
import { Link } from "react-router";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Carousel from "nuka-carousel";
import {
  Footer,
  CivicCardStack,
  BarChart,
  Scatterplot,
  StackedAreaChart,
  PieChart,
  LineChart,
  HorizontalBarChart,
  Logo,
  BrandTheme
} from "@hackoregon/component-library";
import { civicFormat } from "@hackoregon/component-library/dist/utils";

import brain from "@hackoregon/component-library/assets/brain.svg";
import brainMobile from "@hackoregon/component-library/assets/brain-mobile.svg";
import trees from "@hackoregon/component-library/assets/trees.png";
import hackOregonLogo from "@hackoregon/component-library/assets/hack-oregon-logo.png";
import heartMail from "@hackoregon/component-library/assets/heartmail.png";
import twitterLogo from "@hackoregon/component-library/assets/twitter-logo.png";

import CanvasParticles from "./CanvasParticles";

import {
  magnitudeOfUrbanCampsiteSweeps,
  proactivePlanning,
  chartData,
  ridershipData,
  electionsData,
  processedSchoolData
} from "../assets/homePageData";

import transportationMap from "../assets/transportationMap.jpg";
import evictionsMap from "../assets/evictionsMap.jpg";

const civicCategoricalColor1 = "#DC4556";
const civicCategoricalColor2 = "#19B7AA";
const civicCategoricalColor3 = "#1E62BD";
const civicCategoricalColor4 = "#721D7C";
const civicCategoricalColor5 = "#FFB226";

const colors = [
  civicCategoricalColor1,
  civicCategoricalColor2,
  civicCategoricalColor3,
  civicCategoricalColor4,
  civicCategoricalColor5
];

const buttonDropShadow = css`
  background-color: white;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);
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

const topBar = css`
  position: relative;
  width: 100%;
  height: 25px;
  background-color: #240f27;
`;

const bannerBlock = css`
  position: relative;
  width: 100%;
  background-color: #f3f2f3;
  margin-top: 0;
  padding: 0.1em;
`;

const logoWrapper = css`
  position: relative;
  margin: 0;
  padding: 30px 0px 20px;
  width: 160px;
`;

const buttonContainerStatic = css`
  padding-top: 40px;
  align-self: center;
`;

const titleStyle = css`
  font-size: 3.57rem;
  line-height: 1.2;
  font-family: "Rubik", sans-serif;
  letter-spacing: -1px;
  @media (max-width: 640px) {
    font-size: 2.57rem;
  }
`;

const subtitleStyle = css`
  font-size: 1.853rem;
  line-height: 1.2;
  font-weight: 300;
  font-family: "Rubik", sans-serif;
  color: #726371;
  @media (max-width: 640px) {
    font-size: 1.28rem;
  }
`;

const initialContentContainer = css`
  padding: 0px 6%;
  margin: 0 auto;
  max-width: 900px;
`;

const issueStyle = index => css`
  font-size: 1.5rem;
  font-weight: 500;
  font-family: "Rubik", sans-serif;
  color: ${colors[index]};
  text-align: right;
  padding-right: 15px;
  @media (max-width: 640px) {
    font-size: 1.28rem;
  }
`;

const gridContainer = css`
  position: relative;
  display: grid;
  grid-template: 50% 50% / 50% 50%;
  padding: 0px 6%;
  margin: 0 auto;
  max-width: 900px;
  @media (max-width: 850px) {
    grid-template: 25% 25% 25% 25% / 100%;
  }
`;

const gridItem = css`
  position: relative;
  width: 40vw;
  max-width: 400px;
  height: 33.5vw;
  max-height: 335px;
  @media (max-width: 850px) {
    width: 85vw;
    height: 67vw;
  }
`;

const cardImage = css`
  width: 100%;
  padding-bottom: 66.66%;
  position: relative;
`;

const chartWrapper = css`
  height: 20vh;
  min-height: 140px;
  max-height: 180px;
  @media (max-width: 450px) {
    min-height: 13vh;
    height: 15vh;
    padding-bottom: 1em;
  }
`;

const aboutCivicWrapper = css`
  background-color: white;
  height: 100%;
  color: white;
  margin: 60px 0 120px 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);
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
  font-size: 3.57rem;
  letter-spacing: -1px;
  text-align: left;
  line-height: 1.2;
  padding: 0px;
  display: block;
  position: relative;
  box-sizing: border-box;
  @media (max-width: 640px) {
    font-size: 2.57rem;
  }
`;
const sectionHeaderSubtitle = css`
  font-family: "Rubik", sans-serif;
  font-size: 1.42rem;
  color: white;
  display: inline-block;
  @media (max-width: 640px) {
    font-size: 1.14rem;
    line-height: 1.5;
  }
`;
const sectionContentWrapper = css`
  color: black;
  position: relative;
`;

const rightThirdGrid = css`
  display: grid;
  grid-template: 100% / 66.6666% 33.3333%;
  @media (max-width: 850px) {
    grid-template: 100% / 100%;
  }
`;

const leftThirdGrid = css`
  display: grid;
  grid-template: 100% / 33.3333% 66.6666%;
  @media (max-width: 850px) {
    grid-template: 100% / 100%;
  }
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
  font-size: 2.5rem;
  margin: 40px 0;
  text-align: center;
`;
const listSubTitle = css`
  display: block;
  font-family: "Rubik", sans-serif;
  font-size: 1.71rem;
  margin: 12px 0;
`;
const listText = css`
  display: block;
  font-family: "Rubik", sans-serif;
  font-size: 1.14rem;
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
const mediumBackground = css`
  background-color: #aaa4ab;
`;
const leftThirdWrapper = css`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  vertical-align: top;
  padding: 100px 6%;
  background-color: #250f28;
  color: white;

  a {
    border: none;
  }

  p {
    color: white;
    line-height: 1.5;
  }
`;
const rightThirdWrapper = css`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  vertical-align: top;
  padding: 100px 6%;
  background-color: white;

  a {
    border: none;
    :hover {
      cursor: pointer;
    }
  }
`;
const treesBackground = css`
  background: url(${trees}) center no-repeat;
  background-size: cover;
`;
const hackOregonLogoWrapper = css`
  text-align: right;
`;
const hackOregonLogoStyle = css`
  width: 100%;
  max-width: 300px;
`;
const buttonStyle = css`
  border: 2px solid #ef495c;
  padding: 10px 20px;
  font-family: "Rubik", sans-serif;
  font-size: 1.14rem;
  color: #ef495c;
  background-color: transparent;
  margin: 10px 0px 40px;

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
  padding: 6%;

  @media (max-width: 850px) {
    width: 100%;
    text-align: center;
    height: auto;
    text-align: center !important;
  }

  span {
    font-family: "Rubik", sans-serif;
    font-size: 1.14rem;
    display: block;
    margin-top: 20px;
  }
`;
const donateButton = css`
  margin: 0;
`;

class HomePage extends Component {
  componentDidMount() {
    // Used to fade in the page
    this.node.style.opacity = 0;
    window.requestAnimationFrame(() => {
      this.node.style.transition = "opacity 2500ms";
      this.node.style.opacity = 1;
    });
  }

  render() {
    return (
      <div
        css={appWrapper}
        ref={node => {
          this.node = node;
        }}
      >
        <CanvasParticles />
        <div css={contentWrapper}>
          <div css={topBar} />
          <section css={bannerBlock}>
            <div css={[initialContentContainer, BrandTheme.h3]}>
              <a href="https://www.civicsoftwarefoundation.org/">
                {`Learn more about Civic Software Foundation and Demo Day >`}
              </a>
            </div>
          </section>
          <div css={initialContentContainer}>
            <div css={logoWrapper}>
              <Logo />
            </div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              `}
            >
              <div css={titleStyle}>
                Making Public Information
                <br />
                Public Knowledge
              </div>
            </div>
            <div css={subtitleStyle}>Reimagining open data for the web</div>
            <div css={buttonContainerStatic}>
              <Link to="/cities/portland">
                <button
                  type="button"
                  css={[buttonStyle, buttonDropShadow]}
                >{`Explore CIVIC >`}</button>
              </Link>
            </div>
          </div>
          <Link to="/cities/portland">
            <div css={gridContainer}>
              <Carousel
                autoGenerateStyleTag={false}
                autoplay
                autoplayInterval={10000}
                pauseOnHover={false}
                transitionMode="fade"
                wrapAround
                withoutControls
                cellSpacing={20}
              >
                <div css={gridItem}>
                  <div css={issueStyle(0)}>Homelessness</div>
                  <CivicCardStack cards={3}>
                    <div css={chartWrapper}>
                      <BarChart
                        data={magnitudeOfUrbanCampsiteSweeps}
                        xLabel="Month"
                        yLabel="Sweeps"
                        dataKey="date"
                        dataValue="count"
                        xNumberFormatter={civicFormat.monthYear}
                      />
                    </div>
                  </CivicCardStack>
                </div>
                <div css={gridItem}>
                  <div css={issueStyle(3)}>Neighborhoods</div>
                  <CivicCardStack cards={3}>
                    <div css={chartWrapper}>
                      <img
                        src={transportationMap}
                        alt="sample map"
                        css={cardImage}
                      />
                    </div>
                  </CivicCardStack>
                </div>
              </Carousel>
              <Carousel
                autoGenerateStyleTag={false}
                autoplay
                autoplayInterval={5000}
                pauseOnHover={false}
                transitionMode="fade"
                wrapAround
                withoutControls
                cellSpacing={20}
              >
                <div css={gridItem}>
                  <div css={issueStyle(1)}>Disaster Resilience</div>
                  <CivicCardStack cards={3}>
                    <div css={chartWrapper}>
                      <Scatterplot
                        data={proactivePlanning}
                        xLabel="Resilience"
                        yLabel="Displacement"
                        dataKey="census_response_rate"
                        dataKeyLabel="resilienceLabel"
                        dataValue="displaced_percap"
                        dataValueLabel="displacementLabel"
                        dataSeries="quadrant"
                        size={{
                          key: "total_population",
                          minSize: 2,
                          maxSize: 10
                        }}
                        xNumberFormatter={civicFormat.percentage}
                        yNumberFormatter={civicFormat.percentage}
                        legendComponent={() => null}
                      />
                    </div>
                  </CivicCardStack>
                </div>
                <div css={gridItem}>
                  <div css={issueStyle(2)}>Education</div>
                  <CivicCardStack cards={3}>
                    <div css={chartWrapper}>
                      <StackedAreaChart
                        data={processedSchoolData}
                        xLabel="Year"
                        yLabel="Students"
                        dataKey="year"
                        dataValue="value"
                        dataSeries="type"
                        xNumberFormatter={civicFormat.year}
                        yNumberFormatter={civicFormat.year}
                        legendComponent={() => null}
                      />
                    </div>
                  </CivicCardStack>
                </div>
              </Carousel>
              <Carousel
                autoGenerateStyleTag={false}
                autoplay
                autoplayInterval={5000}
                pauseOnHover={false}
                transitionMode="fade"
                wrapAround
                withoutControls
                cellSpacing={20}
              >
                <div css={gridItem}>
                  <div css={issueStyle(2)}>Transportation</div>
                  <CivicCardStack cards={3}>
                    <div css={chartWrapper}>
                      <LineChart
                        data={ridershipData}
                        xLabel="Year"
                        yLabel="Ridership"
                        dataKey="year"
                        dataValue="ons"
                        dataSeries="type"
                        xNumberFormatter={civicFormat.year}
                        legendComponent={() => null}
                      />
                    </div>
                  </CivicCardStack>
                </div>
                <div css={gridItem}>
                  <div css={issueStyle(1)}>Affordable Housing</div>
                  <CivicCardStack cards={3}>
                    <div css={chartWrapper}>
                      <PieChart
                        data={chartData}
                        innerRadius={90}
                        dataLabel="label"
                        dataValue="value"
                      />
                    </div>
                  </CivicCardStack>
                </div>
              </Carousel>
              <Carousel
                autoGenerateStyleTag={false}
                autoplay
                autoplayInterval={10000}
                pauseOnHover={false}
                transitionMode="fade"
                wrapAround
                withoutControls
                cellSpacing={20}
              >
                <div css={gridItem}>
                  <div css={issueStyle(3)}>Local Elections</div>
                  <CivicCardStack cards={3}>
                    <div css={chartWrapper}>
                      <HorizontalBarChart
                        xLabel="Influence"
                        yLabel="Category"
                        dataLabel="category"
                        dataValue="importance"
                        xAxisLabel="Importance"
                        sortOrder="sortOrder"
                        data={electionsData}
                        dataValueFormatter={civicFormat.percentage}
                        domain={{ x: [1, 11], y: [0, 0.6] }}
                      />
                    </div>
                  </CivicCardStack>
                </div>
                <div css={gridItem}>
                  <div css={issueStyle(0)}>Development</div>
                  <CivicCardStack cards={3}>
                    <div css={chartWrapper}>
                      <img
                        src={evictionsMap}
                        alt="sample map"
                        css={cardImage}
                      />
                    </div>
                  </CivicCardStack>
                </div>
              </Carousel>
            </div>
          </Link>
          <div css={initialContentContainer}>
            <div css={buttonContainerStatic}>
              <a href="#getStarted">
                <button type="button" css={[buttonStyle, buttonDropShadow]}>
                  Get started with your city &gt;
                </button>
              </a>
            </div>
            <div css={aboutCivicWrapper} id="aboutCivic">
              <div css={sectionHeaderWrapper}>
                <div css={smallLogoWrapper}>
                  <Logo type="squareLogoInverted" />
                </div>
                <div css={sectionRightContainer}>
                  <div css={sectionHeaderTitle}>Civic Software Foundation</div>
                  <div css={sectionHeaderSubtitle}>
                    CIVIC is a fully open source project. The Civic Software
                    Foundation supports a network of people, cities, and
                    organizations who are dedicated to innovating on the CIVIC
                    Platform.
                  </div>
                </div>
              </div>
              <div css={[sectionContentWrapper, one]}>
                <div css={contentLeftContainer}>
                  <div css={listTitle}>Supporting People</div>
                  <div css={listSubTitle}>Vision</div>
                  <p css={listText}>
                    Empowering cities to create technology that is a reflection
                    of their ambition, their values, and their priorities.
                  </p>
                  <div css={listSubTitle}>Workflow</div>
                  <p css={listText}>
                    Bringing our experience to existing partnerships to reshape
                    and modernize current infrastructure and create a process to
                    ensure sustainable outcomes.
                  </p>
                  <div css={listSubTitle}>Tactics</div>
                  <p css={listText}>
                    Helping teams solve technical challenges with proven
                    implementation strategies.
                  </p>
                </div>
                <div css={brainWrapper}>
                  <img src={brain} alt="" />
                </div>
                <div css={brainWrapperMobile}>
                  <img src={brainMobile} alt="" />
                </div>
                <div css={contentRightContainer}>
                  <div css={listTitle}>Supporting Technology</div>
                  <div css={listSubTitle}>Open Data</div>
                  <p css={listText}>
                    Lowering the barrier to entry for information to be
                    accessible and secure from the internet so data can be
                    actionable in many ways.
                  </p>
                  <div css={listSubTitle}>Open Code</div>
                  <p css={listText}>
                    Designing for maximum interoperability between systems with
                    reproducible standards that are built to scale.
                  </p>
                  <div css={listSubTitle}>Open Outcomes</div>
                  <p css={listText}>
                    Enabling transparency in analytical models with live data
                    sources that power shareable visualizations on the web.
                  </p>
                </div>
              </div>
            </div>

            <div css={aboutCivicWrapper} id="getStarted">
              <div css={[sectionHeaderWrapper, mediumBackground]}>
                <div css={[sectionHeaderTitle, centered]}>
                  Join us in building CIVIC
                </div>
              </div>
              <div css={[sectionContentWrapper, leftThirdGrid]}>
                <div css={leftThirdWrapper}>
                  <div css={listTitle}>Membership Model for Cities</div>
                  <p css={listText}>
                    The code for CIVIC is open source and free, but we recognize
                    cities will be most successful through a supported process.
                  </p>
                  <p css={listText}>
                    We have resources to help navigate the technical challenges
                    and strategic opportunities that facilitate long-term goals
                    for cities engaging with modern data systems.
                  </p>
                  <p css={listText}>
                    We’re announcing a call to action for cities who want to
                    work closely with people who are building the CIVIC Platform
                    to become members and benefit from hands-on collaboration
                    with our partner network.
                  </p>
                  <a href="http://hackoregon.org/membership">
                    <button type="button" css={buttonStyle}>
                      Start the conversation
                    </button>
                  </a>
                </div>
                <div css={rightThirdWrapper}>
                  <div css={listTitle}>
                    Get Involved{" "}
                    <span role="img" aria-label="sparkles">
                      ✨
                    </span>
                  </div>
                  <div css={listSubTitle}>Teamwork and building on CIVIC</div>
                  <p css={listText}>
                    You can help make CIVIC! We’re actively building focus teams
                    across the country to develop new stories, new features, and
                    better functionality on the platform. If you’re interested
                    in collaborating with the people who are creating CIVIC,
                    we’d love to talk to you.
                  </p>
                  <a
                    href="http://hackoregon.org/joinacivicteam"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button type="button" css={buttonStyle}>
                      Apply now
                    </button>
                  </a>
                  <div css={listSubTitle}>
                    Collaborate as an industry partner
                  </div>
                  <p css={listText}>
                    We work with a variety of companies and organizations
                    dedicated to empowering data driven innovation in cities.
                    It’s important that CIVIC includes diverse perspectives
                    across industry sectors whether or not you have experience
                    working with government or software. Start the conversation
                    by applying to join our network.
                  </p>
                  <a
                    href="http://hackoregon.org/joinacivicteam"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button type="button" css={buttonStyle}>
                      Apply now
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div css={aboutCivicWrapper} id="aboutCivic">
              <div css={[sectionHeaderWrapper, treesBackground]}>
                <div css={[sectionHeaderTitle, hackOregonLogoWrapper]}>
                  <img
                    src={hackOregonLogo}
                    css={hackOregonLogoStyle}
                    alt="Hack Oregon logo"
                  />
                </div>
              </div>
              <div css={[sectionContentWrapper, rightThirdGrid]}>
                <div css={[rightThirdWrapper, talkToUs]}>
                  <div css={listTitle}>
                    CIVIC launched to the world June 21st, 2018 at Hack Oregon’s
                    live Demo Day in Portland, Oregon.
                  </div>
                  <div css={listTitle}>
                    <a href="mailto:hi@civicsoftwarefoundation.org">
                      Talk to us
                    </a>
                  </div>
                  <div css={listText}>
                    Please be patient while our website is under construction
                    and stay tuned as we are able to share new things from the
                    Civic Software Foundation.
                  </div>
                  <div css={iconAndTextWrapper}>
                    <img src={heartMail} width="60" alt="Mail Heart" />
                    <span>Subscribe for updates!</span>
                  </div>
                  <div css={iconAndTextWrapper}>
                    <a href="https://secure.squarespace.com/checkout/donate?donatePageId=551721b2e4b057e153f5c1cc">
                      <button type="button" css={[buttonStyle, donateButton]}>
                        Donate
                      </button>
                    </a>
                    <span>Help us continue to maintain and develop CIVIC.</span>
                  </div>
                  <div css={iconAndTextWrapper}>
                    <img src={twitterLogo} width="40" alt="Twitter Logo" />
                    <span>
                      <a href="https://twitter.com/civicsoftware">
                        @civicsoftware
                      </a>
                      <br />
                    </span>
                  </div>
                </div>
                <div css={leftThirdWrapper}>
                  <div css={listTitle}>CIVIC was developed by Hack Oregon.</div>
                  <p css={listText}>
                    The original concept, design, and source code for the CIVIC
                    platform was developed by volunteer teams at Hack Oregon, a
                    rapid-prototyping lab dedicated to creating open data
                    projects that bring insight to local information challenges.
                  </p>
                  <p css={listText}>
                    Hack Oregon is a non-profit program of the Civic Software
                    Foundation.
                  </p>
                  <p css={listText}>
                    If you live in Portland, you can volunteer to join a team
                    for our next cycle.
                  </p>
                  <a href="http://hackoregon.org/civicpdx">
                    <button type="button" css={buttonStyle}>
                      Learn more
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

HomePage.displayName = "HomePage";

export default HomePage;
