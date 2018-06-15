import React, { PropTypes } from 'react';

const Recommendation = ({ recommendation }) => (
  <h2 className="recommendation">
    {recommendation}
  </h2>
);

Recommendation.propTypes = {
  recommendation: PropTypes.string,
};

export default Recommendation;
