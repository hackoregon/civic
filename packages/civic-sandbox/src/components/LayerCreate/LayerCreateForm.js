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
  },
  email2: {
    label: "Email",
    section: "testSection2",
    component: TextField,
    validation: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required")
  }
};

const LayerCreateForm = ({ initialValues, onSubmit, children }) => (
  <Fragment>
    <Form
      fields={fields}
      sections={["testSection", "testSection2"]}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {children}
    </Form>
  </Fragment>
);

export default LayerCreateForm;

LayerCreateForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.any])
};
