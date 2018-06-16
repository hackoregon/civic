import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { Link } from 'react-router';
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
  padding: 12px 16px;
  border: none;
  background-color: #ffffff;
  font-size: 15px;
  letter-spacing: 0;
  color: #001832;
  box-sizing: border-box;
  font-weight: 500;

  ::placeholder {
    color: #001732;
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
const searchSubTitle = css`
  font-family: 'Rubik', sans-serif;
  text-align: left;
  font-size: 16px;
  margin: 0 auto;
  font-weight: 300;
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
  margin: 25px 0;
  max-width: 1000px;
  text-align: left;
  color: #001732;
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
`;
const iconWrapper = css`
  display: inline-block;
  width: 100px;
  margin: 0;
  margin-right: 24px;
  text-align: center;
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
const locationResult = css`
  color: white;
  font-family: 'Rubik',sans-serif;
  font-size: 14px;
  width: 180px;
`;
const whyStyle = css`
  color: #ef495c;

  a {
    border: none;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
const citySkyline = css`
  margin-top: 20px;
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
          <div className={topBar} />
          <div className={leftContainer}>
            <div className={logoWrapper}>
              <img src={require(`../../assets/civic-logo-animated.svg`)} />
            </div>
            <div className={missionStatementTitle}>{'Making Data Human'}</div>
            <p className={missionStatement}>{`CIVIC is a powerful open platform using data in way that’s fundamentally built to serve people.`}</p>
            <p className={missionStatement}>{`We’re reimagining how to make information actionable through visual models, open standards, and creative frameworks that harness human collaboration at scale.`}</p>
            <div className={ctaStyle}><a href="#aboutCivic">Get started with your city &rsaquo;</a></div>
            <div className={citySkyline}><img src={require(`../../assets/cities/portland.png`)} width="100%" /></div>
          </div>
          <div className={collectionsLink}>
            <Link to="/cities/portland">View all Collections &rsaquo;</Link>
          </div>
          <div className={lookupWrapper}>
            <div className={searchTitle}><strong>Explore CIVIC stories</strong></div>
            <div className={searchSubTitle}><em>Discover data near you.</em></div>
            <SearchBar handleSubmit={this.handleSearch} />
            <DataList repos={this.state.repos}/>
          </div>
          <div className={aboutCivicWrapper} id="aboutCivic">
          <div className={aboutTitle}>Under Construction ⚠️</div>
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
    const localImage = this.props.repos.city ? <img src={require(`../../assets/local/local.svg`)} width="70%" /> : <img src={require(`../../assets/local/local.svg`)} width="70%" />

    const ctaMessage = this.props.repos.city === 'PORTLAND' ? (<div className={locationResult}>
    Looks like we have data in your area. Click on a collection to get started.
    </div>) : (<div className={locationResult}>
    {`There's no CIVIC data for ${this.props.repos.city} yet! `}<span className={whyStyle}><a href="#aboutCivic">Why?</a></span>
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
              { localImage }
            </div>
            <div className={cardTextWrapper}>
              <span className={eyebrowStyle}>Local</span>
              <div className={locationTitle}>{this.props.repos.city ? ctaMessage : "Portland Data"}</div>
            </div>
          </div>
        </div>
    )
  }
}
DataList.defaultProps = {
  repos: {}
};

export default LandingPage;
