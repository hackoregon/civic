import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@hackoregon/component-library';

import QRMap from '../QR';
import Question from './Question';
import Recommendation from './Recommendation';

const QuestionForm = ({ back, next, done, questionId }) => (
  <div>
    {questionId === 1 ?
      <h2>Create your individual check list by answering the following questions:</h2> :
    null}
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
    <Recommendation recommendation={QRMap[questionId - 1].note} />
    <div className="button-container">
      {questionId === 1 &&
        <Button onClick={e => next(e)}>
          Next
        </Button>
      }
      {questionId !== 1 && questionId < QRMap.length &&
      <div>
        <Button onClick={e => back(e)}>
          Back
        </Button>
        <Button onClick={e => next(e)}>
          Next
        </Button>
      </div>
      }
      {questionId === QRMap.length &&
      <div>
        <Button onClick={e => back(e)}>
          Back
        </Button>
        <Button onClick={e => done(e)}>
          Done
        </Button>
      </div>
      }
    </div>
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
