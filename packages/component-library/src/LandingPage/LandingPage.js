import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';

import CanvasParticles from './CanvasParticles';
import DataList from './DataList';

import cities from './cities';
import zipCodes from './zipCodes.json';

const searchForm = css`
  display: block;
  width: 100%;
  margin: 24px auto;
  max-width: 420px;
`;

const searchInput = css`
  width: 100%;
  padding: 6px 0px;
  border: none;
  border-bottom: 1px solid white;
  background-color: #250f28;
  font-size: 24px;
  color: white;
  box-sizing: border-box;

  ::placeholder {
    color: #ffffffa1;
  }
`;

const searchTitle = css`
  font-family: 'Rubik', sans-serif;
  text-align: left;
  font-size: 16px;
  margin: 0 auto;
  font-weight: 400;
  color: white;
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

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: {},
    };
  }

  componentDidMount() {
    // Used to fade in the page
  	var elem = ReactDOM.findDOMNode(this);
  	elem.style.opacity = 0;
  	window.requestAnimationFrame(function() {
  		elem.style.transition = "opacity 2500ms";
  		elem.style.opacity = 1;
  	});
  }

  handleSearch = (input) => {
    const zipResult = zipCodes[input];
    const cityResult = cities[input];

    if (zipResult) {
      return this.setState({
        repos: {
          city: zipResult.city,
          state: zipResult.state,
        },
      });
    }

    if (cityResult) {
      return this.setState({
        repos: {
          city: cityResult.name,
          state: cityResult.state,
        },
      });
    }

    return null;
  };

  render() {
    return (
      <div className={appWrapper}>
        <CanvasParticles />
        <div className={contentWrapper}>
          <div className={topBar} />
          <div className={leftContainer}>
            <div className={logoWrapper}>
              <img src={require(`../../assets/civic-logo-animated.svg`)} />
            </div>
            <div className={missionStatementTitle}>{'Making Data Human'}</div>
            <div className={missionStatement}>{`CIVIC is a platform to empower data in a way that’s fundementally built to serve people.  We’re reimagining how to make information actionable through visual models, open standards, and creative frameworks that harness human collaboration at scale.`}</div>
            <img src={require('../../assets/cities/portland.png')} width="100%" />
          </div>
          <div className={collectionsLink}>
            View all Collections &rsaquo;
          </div>
          <div className={lookupWrapper}>
            <h3 className={searchTitle}>Discover data near you</h3>
            <SearchBar handleSubmit={this.handleSearch} />
            <DataList
              city={this.state.repos.city}
              state={this.state.repos.state}
            />
          </div>
        </div>
      </div>
    )
  }
}


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    this.props.handleSubmit(text);
  };

  render() {
    return (
      <form className={searchForm} onSubmit={this.handleSubmit}>
        <input
          name="text"
          className={searchInput}
          type="text"
          placeholder="Enter City or Zip Code"
        />
      </form>
    );
  }
}

export default LandingPage;
