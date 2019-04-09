/* Deprecated component, 2017 only */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';

const StyledLink = styled(Link)`
  padding: 6px 6px 6px 6px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  font-size: 1em;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 1);
`;

const Tag = ({ location, name }) => (
  <StyledLink to={location}>{name}</StyledLink>
);

Tag.displayName = 'Tag';
Tag.propTypes = {
  location: PropTypes.string,
  name: PropTypes.string,
};

export default Tag;
