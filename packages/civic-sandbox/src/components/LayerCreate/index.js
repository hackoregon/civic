/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { Fragment } from "react";
import LayerCreateForm from "./LayerCreateForm";
import "@hackoregon/component-library/assets/global.styles.css";

const formTitle = css`
  font-size: 35px;
  letter-spacing: -2px;
  margin: 10px 0px;
`;

const sectionHeader = css`
  font-size: 20px;
  letter-spacing: -0.5px;
  margin: 80px 0px 10px 0px;
  font-weight: bold;
`;

const container = css`
  position: absolute;
  top: 50px;
  left: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 575px;
  background: rgba(243, 242, 243, 0.9);
  color: rgb(85, 85, 85);
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);
  @media (max-width: 900px) {
    width: 90%;
    bottom: 30px;
    left: 8%;
  }
`;

class LayerCreateComponent extends React.Component {
  render() {
    return (
      <div css={container}>
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
              <p css={formTitle}>Create a New CIVIC Sandbox Layer</p>
              <p>
                Let CIVIC Sandbox tell the story of your data. This form will
                help you upload your dataset and choose the best way to display
                it. Currently we support GeoJSON datasets.
              </p>
              <p>
                If you have a question, get in touch at *insert email here*.{" "}
              </p>
              <p css={sectionHeader}>
                First, let&#39;s get the basics out of the way:
              </p>
              {formSections.baseData}
              <p css={sectionHeader}>
                Okay, tell us more about the data itself:
              </p>
              {formSections.dataDetails}
              <p css={sectionHeader}>
                Next, let&#39;s choose the best type of map for your data:
              </p>
              {formSections.mapType}
            </Fragment>
          )}
        </LayerCreateForm>
      </div>
    );
  }
}

LayerCreateComponent.displayName = "LayerCreateComponent";

export default LayerCreateComponent;
