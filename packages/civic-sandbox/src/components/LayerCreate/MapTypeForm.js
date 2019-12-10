/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import PropTypes from "prop-types";

import { Form, TextField, ButtonNew } from "@hackoregon/component-library";

const wrapper = css`
  padding-bottom: 80px;
`;

const fields = {
  lineWidth: {
    label: "LineWidth",
    section: "pathMapType",
    component: TextField
  },
  opacity: {
    label: "Opacity",
    section: "pathMapType",
    component: TextField
  },
  color: {
    label: "Color",
    section: "pathMapType",
    component: TextField
  }
};

const MapTypeForm = ({ initialValues, onSubmit, children }) => (
  <Fragment>
    <div css={wrapper}>
      <Form
        fields={fields}
        sections={["baseData", "dataDetails", "mapType"]}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {children}
      </Form>
    </div>
    <ButtonNew label="Next" />
  </Fragment>
);

export default MapTypeForm;

MapTypeForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.any])
};
