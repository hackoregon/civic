/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { Form, TextField, ButtonNew } from "@hackoregon/component-library";

const wrapper = css`
  padding-bottom: 80px;
`;

const fields = {
  email: {
    label: "Email",
    section: "baseData",
    component: TextField,
    validation: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required")
  },
  layerName: {
    label: "Layer Name",
    section: "baseData",
    component: TextField
  },
  description: {
    label: "Description",
    section: "baseData",
    component: TextField
  },
  creator: {
    label: "Creator",
    section: "baseData",
    component: TextField
  },
  affiliation: {
    label: "Affiliation",
    section: "baseData",
    component: TextField
  },
  rating: {
    label: "Rating",
    section: "baseData",
    component: TextField
  },
  association: {
    label: "Association",
    section: "baseData",
    component: TextField
  },
  tags: {
    label: "Tags",
    section: "baseData",
    component: TextField
  },
  dataEndpoint: {
    label: "GeoJSON Data Endpoint",
    section: "dataDetails",
    component: TextField
  },
  dateGranularity: {
    label: "Data Endpoint",
    section: "dataDetails",
    component: TextField
  },
  defaultDate: {
    label: "Data Endpoint",
    section: "dataDetails",
    component: TextField
  },
  mapType: {
    label: "Map Type",
    section: "mapType",
    component: TextField
  }
};

const LayerCreateForm = ({ initialValues, onSubmit, children }) => (
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

export default LayerCreateForm;

LayerCreateForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.object]),
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.any])
};
