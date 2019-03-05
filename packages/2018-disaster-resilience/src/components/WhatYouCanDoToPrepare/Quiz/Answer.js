import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const Answer = ({ questionId }) => (
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
);

Answer.propTypes = {
  questionId: PropTypes.number,
};

export default reduxForm({})(Answer);
