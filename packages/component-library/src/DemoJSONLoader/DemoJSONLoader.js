import React from 'react';
import { string, arrayOf } from 'prop-types';
/* eslint-disable import/no-extraneous-dependencies */
/* global fetch */

class StorybookJSONLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    const promisesArr = this.props.urls.map(url => {
      return fetch(url)
        .then(response => response)
        .then(response => response.ok ? response.json() : {error: `${response.status}: ${response.statusText}`, slide_meta:{}, slide_data: {}});
    });

    Promise.all(promisesArr)
      .then(data => this.setState( { data } ))
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.data === null) { return null }
    return this.state.data.length === 1 ? this.props.children(this.state.data[0]) : this.props.children(this.state.data);
  }
}

StorybookJSONLoader.propTypes = {
  urls: arrayOf(string).isRequired,
};

export default StorybookJSONLoader;
