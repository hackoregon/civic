/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment } from "react";
import { string } from "prop-types";
import StorageIcon from "@material-ui/icons/Storage";
import { BrandColors } from "@hackoregon/component-library";
import AccordianContentContainer from "./AccordianContentContainer";

const datasets = [
  { title: "Dataset A", link: "https://www.civicdatalibrary.org/" },
  { title: "Dataset B", link: "https://www.civicdatalibrary.org/" }
];

const Dataset = ({ title }) => {
  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          background-color: ${BrandColors.subdued.hex};
          margin: 1rem;
        `}
      >
        <StorageIcon
          color="secondary"
          fontSize="small"
          css={css`
            margin: 1.25rem 1rem 0 1rem;
          `}
        />
        <h4
          css={css`
            margin-right: 1rem;
          `}
        >
          {title}
        </h4>
      </div>
    </Fragment>
  );
};

Dataset.propTypes = {
  title: string
};

const Lineage = () => (
  <AccordianContentContainer>
    <div
      css={css`
        display: flex;
      `}
    >
      {datasets.map(dataset => (
        <Dataset title={dataset.title} />
      ))}
    </div>
    <h5>Description</h5>
    <p>
      The description of the dataset is simple summary readable by any community
      member. It should be precise, clear, and not too long.
    </p>
    <h5>Purpose</h5>
    <p>
      The purpose of a dataset states the rationale for a dataset and explains
      why the data were collected and why the dataset is of value. The rationale
      for all steps of the data lifecycle should be included. Existing purpose
      statements or needs statements used for funding-related purposes should be
      documented.
    </p>
  </AccordianContentContainer>
);

export default Lineage;
