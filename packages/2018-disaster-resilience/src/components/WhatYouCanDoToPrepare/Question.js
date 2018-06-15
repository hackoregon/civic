import React, { PropTypes } from 'react';

const Question = ({ question }) => (
  <h2 className="question">
    {question}
  </h2>
);

Question.propTypes = {
  question: PropTypes.string,
};

export default Question;
