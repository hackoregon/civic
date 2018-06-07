import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import CanvasParticles from './CanvasParticles'

const cardsWrapper = css`
  display: flex;
  justify-content: space-around;
  padding: 0px 48px;
  margin: 80px 0px;
  flex-wrap: wrap;
`;
const card = css`
  position: relative;
  background-color: white;
  font-size: 2vw;
  flex: 0 0 auto;
  width: calc(25% - 24px);
  padding: 24px;
  box-sizing: border-box;
  text-align: center;
  margin: 6px 0px;
  min-height: 300px;
  transition: all .5s ease-in-out;

  @media (max-width: 990px) {
    width: calc(50% - 24px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  :after {
    display: block;
    content: "";
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0px;
    left: 0px;
    border-top: 4px solid #ef4a5d;
    border-left: 4px solid #240f27;
  }
`;

const searchForm = css`
  display: block;
  width: 100%;
  margin: 30px auto;
  max-width: 420px;
`;

const searchInput = css`
  width: 100%;
  padding: 10px 20px;
  border-radius: 100px;
  border: 2px solid black;
  font-size: 20px;
`;

const searchTitle = css`
  text-align: center;
  font-size: 18px;
`;
const logoWrapper = css`
  position: relative;
  margin: 0 auto;
  padding: 50px 0px;
  width: 180px;
`;
const missionStatementTitle = css`
  text-align: center;
  font-size: 40px;
  width: 50%;
  letter-spacing: -2px;
  margin: 22px auto;
`;
const missionStatement = css`
  font-size: 18px;
  letter-spacing: -1px;
  line-height: 1.8;
  font-family: "Merriweather", serif;
  width: 80%;
  margin: 24px auto;
  max-width: 1000px;
  text-align: center;
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
  margin-top: 100px;
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
          <div className={logoWrapper}>
            <img src={require(`../../assets/civic-logo-animated.svg`)} />
          </div>
          <div className={missionStatementTitle}>{'Making data human, means making data intelligent.'}</div>
          <div className={missionStatement}>{`CIVIC is a platform for evolving powerful data technology, in a way that’s fundamentally built to serve people.`}</div>
          <div className={lookupWrapper}>
            <h3 className={searchTitle}>Look for Civic data in your area</h3>
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
          placeholder="Enter Zip Code"
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

    const countryImage = this.props.repos.city && <img src={require(`../../assets/country/usa.svg`)} width="100%" />
    const stateImage = this.props.repos.state && <img src={require(`../../assets/state/${slugify(this.props.repos.state)}.svg`)} width="100%" />
    const cityImage = this.props.repos.city && <img src={require(`../../assets/cities/${slugify(this.props.repos.city)}.png`)} width="100%" />
    const localImage = this.props.repos.city && <img src={require(`../../assets/local/local.svg`)} width="100%" />

    const ctaMessage = this.props.repos.city === 'PORTLAND' ? (<div>
    Looks like we have data in your area. Click on a collection to get started ↑
    </div>) : (<div>
    We dont see any data in your area. View Portland data or contribute to your region here.
    </div>)

    console.log(`${this.props.repos.city}`)

    return (
        <div className={cardsWrapper}>
          <div className={card}>
            <div>{this.props.repos.country ? this.props.repos.country : "?"}</div>
            { countryImage }
          </div>
          <div className={card}>
            <div>{this.props.repos.state ? this.props.repos.state : "?"}</div>
            {stateImage}
          </div>
          <div className={card}>
            <div>{this.props.repos.city ? this.props.repos.city : "?"}</div>
            { cityImage }
          </div>
          <div className={card}>
            <div>{this.props.repos.city ? "Local" : "?"}</div>
            { localImage }
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
