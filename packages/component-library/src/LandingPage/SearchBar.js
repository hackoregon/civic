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
  padding: 6px 0px;
  border: none;
  border-bottom: 1px solid white;
  background-color: #250f28;
  font-size: 24px;
  color: white;
  box-sizing: border-box;

  ::placeholder {
    color: #ffffffa1;
  }
`;

export default class SearchBar extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
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
