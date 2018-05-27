import React from 'react';
import { css } from 'emotion';

const accentColor = 'rgb(238, 73, 80)';
const commonTransition = 'all .2s ease-in-out';
const buttonClass = css`
  display: flex;
  padding: 6px;
  flex-wrap: nowrap;
`;

const cardsWrapper = css`
  display: flex;
  justify-content: space-between;
  padding: 0px 48px;
  margin: 100px 0px;
`;
const card = css`
  flex: 0 0 auto;
  width: 400px;
  border: 2px solid black;
  box-shadow: 0px 6px 40px 40px pink;
  padding: 24px;
  box-sizing: border-box;
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
  font-size: 24px;
`;

const searchTitle = css`
  text-align: center;
  font-size: 34px;
`;
const logoWrapper = css`
  position: relative;
  margin: 70px auto;
  width: 250px;
`;

class LandingPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      repos: {}
    };
  }

  handleSearch = (user) =>{
    let url = 'https://ZiptasticAPI.com/'+user;
 fetch(url).
  then(response => response.json()).then((repos) => {
      console.log(repos);
      this.setState({
        repos: repos
      });
    });
  };

  render(){
    return (
      <div className="app-container">
        <div className={logoWrapper}>
          <img src={require(`../../assets/civic-logo.svg`)} />
        </div>
        <h3 className={searchTitle}>Look for Civic data in your area</h3>
        <SearchBar handleSubmit={this.handleSearch} />
        <RepoList repos={this.state.repos}/>
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


class RepoList extends React.Component {
  render(){

    function slugify(text)
      {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');            // Trim - from end of text
      }

    const cityImage = this.props.repos.city && <img src={require(`../../assets/cities/${slugify(this.props.repos.city)}.png`)} width="200" />

    return (
      <div>
        {this.props.repos.country &&
        <div className={cardsWrapper}>
          <div className={card}>
            <h1>{this.props.repos.country}</h1>
          </div>
          <div className={card}>
            <h1>{this.props.repos.state}</h1>
          </div>
          <div className={card}>
            <h1>{this.props.repos.city}</h1>
            { cityImage }
          </div>
        </div>}
      </div>
    )
  }
}
RepoList.defaultProps = {
  repos: {}
};

export default LandingPage;
