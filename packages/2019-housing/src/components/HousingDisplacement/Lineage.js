/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const ContentA = () => (
  <Fragment>
    <h3>Sources</h3>
    <h3>Definitions</h3>
    <h3>Variables</h3>
    <h3>Assumptions</h3>
  </Fragment>
);
const ContentB = () => (
  <Fragment>
    <h3>Sources</h3>
    <h3>Definitions</h3>
    <h3>Variables</h3>
    <h3>Assumptions</h3>
  </Fragment>
);

const Lineage = () => (
  <AccordianContentContainer>
    <DataTabs DatasetA={ContentA} DatasetB={ContentB} />
  </AccordianContentContainer>
);

export default Lineage;
