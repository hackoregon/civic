import React, { PropTypes } from 'react';

const Question = ({ question, questionId }) => (
  <h3 className="question">{`Question ${questionId}. ${question}`}</h3>
);

Question.propTypes = {
  question: PropTypes.string,
  questionId: PropTypes.number,
};

export default Question;
