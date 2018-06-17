import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router';

import CanvasParticles from './CanvasParticles';
import DataList from './DataList';
import SearchBar from './SearchBar';

import logo from '../../assets/civic-logo-animated.svg';

import cities from './cities';
import zipCodes from './zipCodes.json';

const searchTitle = css`
  font-family: 'Rubik', sans-serif;
  text-align: left;
  font-size: 21px;
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
const aboutCivicWrapper = css`
  background-color: #240f27;
  margin-top: 120px;
  height: 90vh;
  color: white;
`;
const aboutTitle = css`
  color: white;
  font-family: 'Rubik',sans-serif;
  font-size: 40px;
  text-align: center;
  padding: 100px 0;
  display: block;
  position: relative;
  box-sizing: border-box;
`;

const citySkyline = css`
  margin-top: 20px;
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
            <div className={aboutTitle}>Under Construction ⚠️</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
