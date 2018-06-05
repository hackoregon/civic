import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { Link } from 'react-router';

const cardsWrapper = css`
  display: flex;
  justify-content: space-around;
  padding: 0px 48px;
  margin: 80px 0px;
  flex-wrap: wrap;
`;
const card = css`
  font-size: 2vw;
  flex: 0 0 auto;
  width: calc(33.333% - 24px);
  border: 2px solid black;
  padding: 24px;
  box-sizing: border-box;
  text-align: center;
  margin: 6px 0px;
  min-height: 300px;
  max-height: 300px;
  transition: all .5s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
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
  margin: 70px auto;
  width: 250px;
`;
const missionStatement = css`
  font-size: 18px;
  letter-spacing: -1px;
  line-height: 1.8;
  font-family: "Merriweather", serif;
  width: 80%;
  margin: 48px auto;
  max-width: 1000px;
  text-align: center;
`;
const appWrapper = css`
  background-color: #f3f1f3;
  padding: 24px;
  height: auto;
  box-sizing: border-box;
`;

class HomePage extends React.Component {

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
        <div className="app-container">
          <div className={logoWrapper}>
            <img src={require(`../assets/civic-logo-animated.svg`)} />
          </div>
          <div className={missionStatement}>{`Here's a short mission statement section. It talks about what values we stand for and what the purpose of this project is. Short blurb about data visualization and civic politics.`}</div>
          <h3 className={searchTitle}>Look for Civic data in your area</h3>
          <SearchBar handleSubmit={this.handleSearch} />
          <DataList repos={this.state.repos}/>
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

    const cityImage = this.props.repos.city && <img src={require(`../assets/cities/${slugify(this.props.repos.city)}.png`)} width="100%" />

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
          </div>
          <div className={card}>
            <div>{this.props.repos.state ? this.props.repos.state : "?"}</div>
          </div>
          <div className={card}>
            <div>{this.props.repos.city ? this.props.repos.city : "?"}</div>
            { cityImage }
          </div>
          { this.props.repos.city && ctaMessage }
        </div>
    )
  }
}
DataList.defaultProps = {
  repos: {}
};

export default HomePage;
