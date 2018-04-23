import React from 'react';
import { css } from 'emotion';

const placeholderClass = css`
  text-align: center;
  border-radius: 15px;
  border: 3px dashed #CCC;
  color: #666;
  padding: 3em;
  font-size: 18px;

  & h1, & h2 {
    font-size: 2em;
    font-weight: bold;
  }
`;

const DefaultText = () => (
  <div>
    <h1>Content Placeholder</h1>
    <p>Stuff coming soon!</p>
  </div>
);

const Placeholder = ({ children }) => (
  <div className={placeholderClass}>
    {children || <DefaultText />}
  </div>
);

Placeholder.displayName = 'Placeholder';
Placeholder.propTypes = {
  children: React.PropTypes.node,
};

export default Placeholder;
