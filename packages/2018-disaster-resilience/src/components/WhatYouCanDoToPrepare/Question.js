import React, { PropTypes } from 'react';

const Question = ({ question, questionId }) => (
  <h2 className="question">
    {`Question ${questionId}. ${question}`}
  </h2>
);

Question.propTypes = {
  question: PropTypes.string,
  questionId: PropTypes.number,
};

export default Question;
