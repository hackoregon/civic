import React, { PropTypes } from 'react';

const Recommendation = ({ recommendation }) => (
  <h3 className="recommendation">
    {recommendation}
  </h3>
);

Recommendation.propTypes = {
  recommendation: PropTypes.string,
};

export default Recommendation;
