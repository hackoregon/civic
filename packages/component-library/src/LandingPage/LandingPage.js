import React from 'react';
import { cx, css } from 'emotion';
import { Link } from 'react-router';

import CanvasParticles from './CanvasParticles';
import DataList from './DataList';
import SearchBar from './SearchBar';
import { Footer } from '@hackoregon/component-library';

import logo from '../../assets/civic-logo-animated.svg';
import smallLogo from '../../assets/civic-logo-c.svg'
import brain from '../../assets/brain.svg'
import trees from '../../assets/trees.png'
import hackOregonLogo from '../../assets/hack-oregon-logo.png'
import heartMail from '../../assets/heartmail.png'
import twitterLogo from '../../assets/twitter-logo.png'

import cities from './cities';
import zipCodes from './zipCodes.json';

const searchTitle = css`
  font-family: 'Rubik', sans-serif;
  text-align: left;
  font-size: 18px;
  color: white;
  margin: 0 auto;
`;
const searchSubTitle = css`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  font-style: italic;
  color: #AAA4AB;
  margin: 0;
`;
const logoWrapper = css`
  position: relative;
  margin: 0;
  padding: 30px 0px 20px;
  width: 160px;
`;
const missionStatementTitle = css`
  font-family: 'Rubik', sans-serif;
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
  font-family: "Rubik",sans-serif;
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
  background-color: #f3f1f3;
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
    content: '';
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
  font-family: 'Rubik';
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
  font-family: 'Rubik';
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
  padding: 60px 20%;
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
  font-family: 'Rubik',sans-serif;
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
  font-family: 'Rubik', sans-serif;
  font-size: 24px;
  color: white;
  display: inline-block;
`;
const sectionContentWrapper = css`
  background-color: white;
  color: black;
  position: relative;
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
  font-family: 'Rubik', sans-serif;
  font-size: 35px;
  margin: 40px 0;
  text-align: center;
`;
const listSubTitle = css`
  display: block;
  font-family: 'Rubik', sans-serif;
  font-size: 24px;
  margin: 12px 0;
`;
const listText = css`
  display: block;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  color: black;
`;
const brainWrapper = css`
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 10;

  @media (max-width: 850px) {
    img {
      height: 182px;
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

  p {
      color: white;
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
  font-family: 'Rubik',sans-serif;
  font-size: 16px;
  color: #ef495c;
  background-color: transparent;
  margin: 10px 0px 50px;
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
    font-family: 'Rubik',sans-serif;
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
    city: 'Portland',
    state: 'OR',
    imgPath: 'portland',
  };

  componentDidMount() {
    // Used to fade in the page
    this.node.style.opacity = 0;
    window.requestAnimationFrame(() => {
      this.node.style.transition = 'opacity 2500ms';
      this.node.style.opacity = 1;
    });
  }

  handleSearch = (input) => {
    const key = input ? input.toLowerCase() : '';
    const cityResult = cities[key];

    if (cityResult) {
      return this.setState({
        city: cityResult.name,
        state: cityResult.state,
        imgPath: cityResult.path,
      });
    }

    const zipResult = zipCodes[key];

    if (zipResult) {
      const cityData = zipResult.city ? cities[zipResult.city.toLowerCase()] : {};
      return this.setState({
        city: cityData ? cityData.name : zipResult.city,
        state: zipResult.state,
        imgPath: cityData ? cityData.imgPath : 'portland',
      });
    }

    return null;
  };

  render() {
    const { city, state, imgPath } = this.state;
    const cityPath = require(`../../assets/cities/${imgPath || 'portland'}.png`);

    return (
      <div className={appWrapper} ref={(node) => { this.node = node; }}>
        <CanvasParticles />
        <div className={contentWrapper}>
          <div className={topBar} />
          <div className={leftContainer}>
            <div className={logoWrapper}>
              <img src={logo} />
            </div>
            <div className={missionStatementTitle}>{'Making Data Human'}</div>
            <p className={missionStatement}>{`CIVIC is a powerful open platform using data in way that’s fundamentally built to serve people.`}</p>
            <p className={missionStatement}>{`We’re reimagining how to make information actionable through visual models, open standards, and creative frameworks that harness human collaboration at scale.`}</p>
            <div className={ctaStyle}><a href="#aboutCivic">Get started with your city &rsaquo;</a></div>
            <div className={citySkyline}><img src={ cityPath} width="100%" /></div>
          </div>
          <div className={collectionsLink}>
            <Link to="/cities/portland">View all Collections &rsaquo;</Link>
          </div>

          <div className={lookupWrapper}>
            <div className={searchTitle}><strong>Explore CIVIC stories</strong></div>
            <div className={searchSubTitle}><em>Discover data near you.</em></div>
            <SearchBar handleSubmit={this.handleSearch} />
            <DataList city={city} state={state} />
          </div>

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
                  Lorem ipsum dolor
                </div>
              </div>
            </div>
            <div className={sectionContentWrapper}>
              <div className={contentLeftContainer}>
                <div className={listTitle}>Supporting People</div>
                <div className={listSubTitle}>Vision</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <div className={listSubTitle}>Workflow</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <div className={listSubTitle}>Tactics</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
              </div>
              <div className={brainWrapper}>
                <img src={brain} />
              </div>
              <div className={contentRightContainer}>
                <div className={listTitle}>Supporting People</div>
                <div className={listSubTitle}>Vision</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <div className={listSubTitle}>Workflow</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <div className={listSubTitle}>Tactics</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
              </div>
            </div>
          </div>

          <div className={aboutCivicWrapper} id="aboutCivic">
            <div className={cx(sectionHeaderWrapper, salmonBackground)}>
              <div className={cx(sectionHeaderTitle, centered)}>
                CIVIC is made by people.
              </div>
            </div>
            <div className={sectionContentWrapper}>
              <div className={leftThirdWrapper}>
                <div className={listTitle}>Membership Model for Cities</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <button className={buttonStyle}>Start the conversation</button>
              </div>
              <div className={rightThirdWrapper}>
                <div className={listTitle}>Get Involved ✨</div>
                <div className={listSubTitle}>Teamwork and building on CIVIC</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <button className={buttonStyle}>Apply now</button>
                <div className={listSubTitle}>Collaborate as an industry partner</div>
                <p className={listText}>We’re reimagining how to make information actionable through visual models, open.</p>
                <button className={buttonStyle}>Apply now</button>
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
                <div className={listSubTitle}>hi@civicsoftwarefoundation.org</div>
                <div className={listTitle}>CIVIC launched to the world June 21st, 2018 at Hack Oregon’s live Demo Day in Portland, Oregon.</div>
                <div className={listSubTitle}>Please be patient while our website is under construction and stay tuned as we are able to share new things from the CIVIC Software Foundation.</div>
                <div className={iconAndTextWrapper}>
                  <img src={heartMail} width="60" />
                  <span>Subscribe for updates!</span>
                </div>
                <div className={iconAndTextWrapper}>
                  <button className={cx(buttonStyle, donateButton)}>Donate</button>
                  <span>Help us continue to maintain and develop CIVIC.</span>
                </div>
                <div className={iconAndTextWrapper}>
                  <img src={twitterLogo} width="40" />
                  <span>@civicsoftwarefoundation #CIVIC4Lyfe</span>
                </div>
              </div>
              <div className={leftThirdWrapper}>
                <div className={listTitle}>CIVIC was developed by Hack Oregon.</div>
                <p className={listText}>The original concept, design, and source code for the CIVIC platform was developed by volunteer teams at Hack Oregon, a rapid-prototyping lab dedicated to creating open data projects that bring insight to local information challenges.</p>
                <p className={listText}>Hack Oregon is a non-profit program of the CIVIC Software Foundation.</p>
                <p className={listText}>If you live in Portland, you can volunteer to join a team for our next cycle.</p>
                <button className={buttonStyle}>Learn more</button>
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
