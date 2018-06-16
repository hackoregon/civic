import React, { PropTypes } from 'react';

const Answer = ({ answer, selectAnswer }) => (
  <form>
    <div className="radio">
      <label>
        <input
          type="radio"
          value="yes"
          checked={answer === 'yes'}
          onChange={e => selectAnswer(e)}
        />
        Yes
      </label>
    </div>
    <div className="radio">
      <label>
        <input
          type="radio"
          value="no"
          checked={answer === 'no'}
          onChange={e => selectAnswer(e)}
        />
        No
      </label>
    </div>
  </form>
);

Answer.propTypes = {
  answer: PropTypes.string,
  selectAnswer: PropTypes.func.isRequired,
};

export default Answer;
