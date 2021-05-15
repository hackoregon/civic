/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Placeholder } from "@hackoregon/component-library";
import { Fragment } from "react";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const ContentStorycard = () => (
  <Fragment>
    <p>
      This analysis would not have been possible, much less equitable, without
      the contribution of data constituents’ lived experiences, insights, and
      skills. <a href="">Read more about our engagement process.</a>
    </p>
    <Placeholder>
      <h2>Multimedia format here</h2>
    </Placeholder>
  </Fragment>
);
const ContentA = () => (
  <Fragment>
    <p>
      This analysis would not have been possible, much less equitable, without
      the contribution of data constituents’ lived experiences, insights, and
      skills. <a href="">Read more about our engagement process.</a>
    </p>{" "}
    <Placeholder>
      <h2>Multimedia format here</h2>
    </Placeholder>
  </Fragment>
);
const ContentB = () => (
  <Fragment>
    <p>
      This analysis would not have been possible, much less equitable, without
      the contribution of data constituents’ lived experiences, insights, and
      skills. <a href="">Read more about our engagement process.</a>
    </p>{" "}
    <Placeholder>
      <h2>Multimedia format here</h2>
    </Placeholder>
  </Fragment>
);

const Constituents = () => (
  <AccordianContentContainer>
    <DataTabs
      Storycard={ContentStorycard}
      DatasetA={ContentA}
      DatasetB={ContentB}
    />
  </AccordianContentContainer>
);

export default Constituents;
