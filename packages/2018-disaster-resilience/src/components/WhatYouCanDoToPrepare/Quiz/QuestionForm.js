/* TODO: fix linting errors */
/* eslint-disable */
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from "@hackoregon/component-library";
import { css } from "@emotion/core";

import QRMap from "../QR";
import Question from "./Question";
import Recommendation from "./Recommendation";

const radio = css`
  font-size: 18px;
  margin: 10px 20px;

  input {
    margin-right: 1em;
  }
`;

const formClass = css`
  margin: 40px 0;
`;

const QuestionForm = ({ back, next, done, questionId }) => (
  <div>
    {questionId === 1 ? (
      <Fragment>
        <p>
          In the event of a catastrophic earthquake or other disaster, official
          first responders such as fire fighters will need to contend with large
          incidents throughout the region. While they’re occupied with those,
          citizens may need to handle small and mid-sized problems themselves
          for days or weeks. Cell phone service, power, water, and other
          utilities may be disrupted indefinitely, so people will need to be
          able to care for themselves and their neighbors.
        </p>
        <p>
          The key is preparation, so take this Earthquake Preparedness Quiz and
          see how ready you are:
        </p>
      </Fragment>
    ) : null}
    <Question
      question={QRMap[questionId - 1].question}
      questionId={questionId}
    />
    <form className={formClass}>
      <div className={radio}>
        <label>
          <Field
            name={`${questionId}`}
            component="input"
            type="radio"
            value="yes"
            onBlur={e => e.preventDefault()}
            onFocus={e => e.preventDefault()}
          />
          Yes
        </label>
      </div>
      <div className={radio}>
        <label>
          <Field
            name={`${questionId}`}
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
      {questionId === 1 && <Button onClick={e => next(e)}>Next</Button>}
      {questionId !== 1 && questionId < QRMap.length && (
        <div>
          <Button
            display="inline"
            margin="0px 10px 0px 0px"
            onClick={e => back(e)}
          >
            Back
          </Button>
          <Button display="inline" onClick={e => next(e)}>
            Next
          </Button>
        </div>
      )}
      {questionId === QRMap.length && (
        <div>
          <Button
            display="inline"
            margin="0px 10px 0px 0px"
            onClick={e => back(e)}
          >
            Back
          </Button>
          <Button display="inline" onClick={e => done(e)}>
            Done
          </Button>
        </div>
      )}
    </div>
  </div>
);

QuestionForm.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired,
  questionId: PropTypes.number
};

export default reduxForm({
  form: "Quiz",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(QuestionForm);
