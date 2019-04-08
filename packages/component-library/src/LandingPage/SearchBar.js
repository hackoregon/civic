/* Not currently used, updated and moved to 2018 package */
/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

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

  @media (max-width: 850px) {
    font-size: 16px;
  }
`;

export default class SearchBar extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = event => {
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
