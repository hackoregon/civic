/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from "prop-types";
import React from "react";
import { Field, reduxForm } from "redux-form";

const Answer = ({ questionId }) => (
  <form>
    <div className="radio">
      <label>
        Yes
        <Field
          name={`Q${questionId}answer`}
          component="input"
          type="radio"
          value="yes"
          onBlur={e => e.preventDefault()}
          onFocus={e => e.preventDefault()}
        />
      </label>
    </div>
    <div className="radio">
      <label>
        No
        <Field
          name={`Q${questionId}answer`}
          component="input"
          type="radio"
          value="no"
          onBlur={e => e.preventDefault()}
          onFocus={e => e.preventDefault()}
        />
      </label>
    </div>
  </form>
);

Answer.propTypes = {
  questionId: PropTypes.number
};

export default reduxForm({})(Answer);
