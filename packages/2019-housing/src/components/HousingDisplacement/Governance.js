/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const ContentStorycard = () => (
  <Fragment>
    <h3>Key warnings</h3>
    <h3>Risks</h3>
    <h3>Opportunities</h3>
    <h3>Guidelines</h3>
  </Fragment>
);
const ContentA = () => (
  <Fragment>
    <h3>Key warnings</h3>
    <h3>Risks</h3>
    <h3>Opportunities</h3>
    <h3>Guidelines</h3>
  </Fragment>
);
const ContentB = () => (
  <Fragment>
    <h3>Key warnings</h3>
    <h3>Risks</h3>
    <h3>Opportunities</h3>
    <h3>Guidelines</h3>
  </Fragment>
);

const Governance = () => (
  <AccordianContentContainer>
    <DataTabs
      Storycard={ContentStorycard}
      DatasetA={ContentA}
      DatasetB={ContentB}
    />
  </AccordianContentContainer>
);

export default Governance;
