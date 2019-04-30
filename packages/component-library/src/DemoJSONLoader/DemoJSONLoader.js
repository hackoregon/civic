import React from "react";
import { string, arrayOf, node } from "prop-types";
/* global fetch */

class StorybookJSONLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    const { urls } = this.props;
    const promisesArr = urls.map(url => {
      return fetch(url)
        .then(response => response)
        .then(response =>
          response.ok
            ? response.json()
            : {
                error: `${response.status}: ${response.statusText}`,
                slide_meta: {},
                slide_data: {}
              }
        );
    });

    Promise.all(promisesArr)
      .then(data => this.setState({ data }))
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }

  render() {
    const { data } = this.state;
    const { children } = this.props;
    if (data === null) {
      return null;
    }
    return data.length === 1 ? children(data[0]) : children(data);
  }
}

StorybookJSONLoader.propTypes = {
  urls: arrayOf(string).isRequired,
  children: node
};

export default StorybookJSONLoader;
