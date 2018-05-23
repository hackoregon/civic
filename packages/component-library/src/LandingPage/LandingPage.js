import React from 'react';
import { css } from 'emotion';

const accentColor = 'rgb(238, 73, 80)';
const commonTransition = 'all .2s ease-in-out';
const buttonClass = css`
  display: flex;
  padding: 6px;
  flex-wrap: nowrap;
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
        <h3>Look for Civic data in your area</h3>
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
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          className="form-control"
          type="text"
          placeholder="Enter Zip Code"
        />
      </form>
    );
  }
}


class RepoList extends React.Component {

  render(){
    return (
      <div className="list-group">
        <h1>{this.props.repos.country}</h1>
        <h1>{this.props.repos.state}</h1>
        <h1>{this.props.repos.city}</h1>
      </div>
    )
  }
}
RepoList.defaultProps = {
  repos: {}
};

export default LandingPage;
