import React, { Fragment } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { Form, TextField } from "@hackoregon/component-library";

const fields = {
  email: {
    label: "Email",
    section: "testSection",
    component: TextField,
    validation: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required")
  }
};

const TestForm = ({ initialValues, onSubmit, children }) => (
  <Fragment>
    <Form
      fields={fields}
      sections={["testSection"]}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {children}
    </Form>
  </Fragment>
);

export default TestForm;

TestForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.any])
};
