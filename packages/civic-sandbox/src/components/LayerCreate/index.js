/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { Fragment } from "react";
import LayerCreateForm from "./LayerCreateForm";

const formTitle = css`
  font-size: 35px;
  letter-spacing: -2px;
  margin: 10px 0px;
`;

class LayerCreateComponent extends React.Component {
  render() {
    return (
      <LayerCreateForm
        onSubmit={values => {
          console.log(values);
        }}
        initialValues={{
          email: ""
        }}
      >
        {({ formSections }) => (
          <Fragment>
            <p css={formTitle}>Test Form</p>
            <p>This is a test form with a text field.</p>
            {formSections.testSection}
          </Fragment>
        )}
      </LayerCreateForm>
    );
  }
}

LayerCreateComponent.displayName = "LayerCreateComponent";

export default LayerCreateComponent;
