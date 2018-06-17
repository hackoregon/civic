import React from 'react';
import { css } from 'emotion';

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
  width: 100%;
  letter-spacing: -2px;
  margin: 0;
`;
const missionStatement = css`
  font-size: 20px;
  line-height: 1.8;
  font-family: "Rubik",sans-serif;
  width: 100%;
  margin: 40px 0 60px;
  max-width: 1000px;
  text-align: left;
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
  border-top: 15px;
  border-top-style: solid;
  border-top-color: #EE495C;
`;
const collectionsLink = css`
  display: block;
  font-family: 'Rubik';
  font-size: 16px;
  position: absolute;
  top: 70px;
  right: 9%;
  margin: 0;
`;
const leftContainer = css`
  display: block;
  box-sizing: border-box;
  position: relative;
  padding-left: 70px;
  width: 50%;
`;
const topBar = css`
  position: relative;
  width: 100%;
  height: 25px;
  background-color: #240f27;
`;

class LandingPage extends React.Component {
  state = {
    city: 'Austin',
    state: 'TX',
    imgPath: 'austin',
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
        city: cityData ? cityData.city : zipResult.city,
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
            <div className={missionStatementTitle}>Making Data Human</div>
            <div className={missionStatement}>
              CIVIC is a platform to empower data in a way that’s fundementally built
              to serve people. We’re reimagining how to make information actionable
              through visual models, open standards, and creative frameworks that harness
              human collaboration at scale.
            </div>
            <img src={cityPath} width="100%" />
          </div>
          <div className={collectionsLink}>
            View all Collections &rsaquo;
          </div>

          <div className={lookupWrapper}>
            <h2 className={searchTitle}>Explore CIVIC Stories</h2>
            <h3 className={searchSubTitle}>Discover data near you</h3>
            <SearchBar handleSubmit={this.handleSearch} />
            <DataList city={city} state={state} />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
