import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import CanvasParticles from './CanvasParticles'

const cardsWrapper = css`
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;
const card = css`
  font-family: 'Rubik';
  position: relative;
  background-color: transparent;
  font-size: 2vw;
  flex: 0 0 auto;
  width: 100%;
  padding: 12px 0;
  box-sizing: border-box;
  text-align: left;
  margin: 6px 0px;
  transition: all .3s ease-in-out;

  :hover {
    transform: translateY(-3px);
    cursor: pointer;
  }
`;
const cardTextWrapper = css`
  display: inline-block;
  position: relative;
  vertical-align: top;
`;
const eyebrowStyle = css`
  display: block;
  font-family: 'Rubik';
  font-size: 14px;
  color: #EE495C;
`;
const locationTitle = css`
  display: block;
  font-family: 'Rubik';
  font-size: 18px;
  color: white;
`;

const searchForm = css`
  display: block;
  width: 100%;
  margin: 24px auto;
  max-width: 420px;
`;

const searchInput = css`
  width: 100%;
  padding: 10px 20px;
  border-radius: 100px;
  border: 2px solid white;
  background-color: #250f28;
  font-size: 20px;
  color: white;
  box-sizing: border-box;

  ::placeholder {
    color: white;
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
  padding: 50px 0px 50px;
  width: 180px;
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
  margin: 20px 0;
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
  margin-top: 125px;
  background-color: #240f27;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: absolute;
  top: 0;
  right: 9%;
  box-shadow: 14px 30px 60px 9px #0f18287a;
`;
const iconWrapper = css`
  display: inline-block;
  width: 100px;
  margin: 0;
  margin-right: 24px;
`;
const collectionsLink = css`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin: 24px;
`;
const leftContainer = css`
  display: block;
  box-sizing: border-box;
  position: relative;
  padding-left: 50px;
  width: 50%;
`;

class LandingPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      repos: {}
    };
  }

  handleSearch = (user) => {
    if (!/\D/.test(user)) {
      let url = 'https://ZiptasticAPI.com/'+user;
      fetch(url).
      then(response => response.json()).then((repos) => {
        console.log('hi');
        console.log(repos);
        this.setState({
          repos: repos
        });
      });
    } else {
      this.setState({
        repos: {
          country: "US",
          state: "OR",
          city: user.toUpperCase()
        }
      })
    }
  };

  componentDidMount() {
    // Used to fade in the page
  	var elem = ReactDOM.findDOMNode(this);
  	elem.style.opacity = 0;
  	window.requestAnimationFrame(function() {
  		elem.style.transition = "opacity 2500ms";
  		elem.style.opacity = 1;
  	});
  }

  render(){
    return (
      <div className={appWrapper}>
        <CanvasParticles />
        <div className={contentWrapper}>
          <div className={leftContainer}>
            <div className={logoWrapper}>
              <img src={require(`../../assets/civic-logo-animated.svg`)} />
            </div>
            <div className={missionStatementTitle}>{'Making data human, means making data intelligent.'}</div>
            <div className={missionStatement}>{`CIVIC is a platform to empower data in a way that’s fundementally built to serve people.  We’re reimagining how to make information actionable through visual models, open standards, and creative frameworks that harness human collaboration at scale.`}</div>
          </div>
          <div className={collectionsLink}>
            View Collections
          </div>
          <div className={lookupWrapper}>
            <h3 className={searchTitle}>Discover data near you</h3>
            <SearchBar handleSubmit={this.handleSearch} />
            <DataList repos={this.state.repos}/>
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


class DataList extends React.Component {
  render(){

    const slugify = (text) => {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }

    const countryImage = this.props.repos.city ? <img src={require(`../../assets/country/usa.svg`)} width="100%" /> : <img src={require(`../../assets/country/usa.svg`)} width="100%" />
    const stateImage = this.props.repos.state ? <img src={require(`../../assets/state/${slugify(this.props.repos.state)}.svg`)} width="100%" /> : <img src={require(`../../assets/state/or.svg`)} width="100%" />
    const cityImage = this.props.repos.city ? <img src={require(`../../assets/cities/${slugify(this.props.repos.city)}.png`)} width="100%" /> : <img src={require(`../../assets/cities/portland.png`)} width="100%" />
    const localImage = this.props.repos.city ? <img src={require(`../../assets/local/local.svg`)} width="100%" /> : <img src={require(`../../assets/local/local.svg`)} width="100%" />

    const ctaMessage = this.props.repos.city === 'PORTLAND' ? (<div>
    Looks like we have data in your area. Click on a collection to get started ↑
    </div>) : (<div>
    We dont see any data in your area. View Portland data or contribute to your region here.
    </div>)

    console.log(`${this.props.repos.city}`)

    return (
        <div className={cardsWrapper}>
          <div className={card}>
            <div className={iconWrapper}>
              { countryImage }
            </div>
            <div className={cardTextWrapper}>
              <span className={eyebrowStyle}>National</span>
              <div className={locationTitle}>{this.props.repos.country ? this.props.repos.country : "?"}</div>
            </div>
          </div>
          <div className={card}>
            <div className={iconWrapper}>
              {stateImage}
            </div>
            <div className={cardTextWrapper}>
              <span className={eyebrowStyle}>State</span>
              <div className={locationTitle}>{this.props.repos.state ? this.props.repos.state : "?"}</div>
            </div>
          </div>
          <div className={card}>
            <div className={iconWrapper}>
              { cityImage }
            </div>
            <div className={cardTextWrapper}>
              <div className={locationTitle}>{this.props.repos.city ? this.props.repos.city : "?"}</div>
            </div>
          </div>
          <div className={card}>
            <div className={iconWrapper}>
              { localImage }
            </div>
            <div className={cardTextWrapper}>
              <span className={eyebrowStyle}>Local</span>
              <div className={locationTitle}>{this.props.repos.city ? "Local" : "?"}</div>
            </div>
          </div>
          { this.props.repos.city && ctaMessage }
        </div>
    )
  }
}
DataList.defaultProps = {
  repos: {}
};

export default LandingPage;
