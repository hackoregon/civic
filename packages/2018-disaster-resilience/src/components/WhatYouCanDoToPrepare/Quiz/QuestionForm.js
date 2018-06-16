import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@hackoregon/component-library';

import QRMap from '../QR';
import Question from './Question';
import Recommendation from './Recommendation';

const QuestionForm = ({ back, next, done, questionId }) => (
  <div>
    <Question
      question={QRMap[questionId - 1].question}
      questionId={questionId}
    />
    <form>
      <div className="radio">
        <label>
          <Field
            name={`Q${questionId}answer`}
            component="input"
            type="radio"
            value="yes"
            onBlur={e => e.preventDefault()}
            onFocus={e => e.preventDefault()}
          />
          Yes
        </label>
      </div>
      <div className="radio">
        <label>
          <Field
            name={`Q${questionId}answer`}
            component="input"
            type="radio"
            value="no"
            onBlur={e => e.preventDefault()}
            onFocus={e => e.preventDefault()}
          />
          No
        </label>
      </div>
    </form>
    <div className="button-container">
      <Button onClick={e => back(e)}>
        Back
      </Button>
      {questionId === QRMap.length ? (
        <Button onClick={e => done(e)}>
          Done
        </Button>
      ) : (
        <Button onClick={e => next(e)}>
          Next
        </Button>
      ) }
    </div>
    <Recommendation recommendation={QRMap[questionId - 1].recommendation} />
  </div>
);

QuestionForm.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default reduxForm({
  form: 'Quiz',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(QuestionForm);
