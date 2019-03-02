import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const propTypes = {
  total: PropTypes.string,
  inState: PropTypes.string,
};

const wrapperClass = css`
  height: 100%;
  width: 100%;
  display: inline-flex;
  text-align: center;
`;

const contentClass = css`
  margin: auto;
`;

const headerClass = css`
  font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: bold;
  font-size: 21px;
`;

const MoneyRaisedKPI = ({ total, inState }) => {
  return (
    <div className={wrapperClass}>
      <div className={contentClass}>
        <h2 className={headerClass}>Total raised</h2>
        {total}
        <h2 className={headerClass}>In state</h2>
        {inState}
      </div>
    </div>
  );
};

MoneyRaisedKPI.propTypes = propTypes;

export default MoneyRaisedKPI;
