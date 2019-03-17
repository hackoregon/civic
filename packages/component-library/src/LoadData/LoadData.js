import React from 'react';
import { string, arrayOf } from 'prop-types';
/* eslint-disable import/no-extraneous-dependencies */
/* global fetch */

class LoadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    Promise.all(this.props.urls.map(url => fetch(url).then(res => res.json())))
      .then(fetchedData => this.setState({data: fetchedData}))
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.data === null) { return null }
    // console.log('this.state.data:', this.state.data);
    return this.state.data.length === 1 ? this.props.children(this.state.data[0]) : this.props.children(this.state.data);
  }
}

LoadData.propTypes = {
  urls: arrayOf(string).isRequired,
};

export default LoadData;
