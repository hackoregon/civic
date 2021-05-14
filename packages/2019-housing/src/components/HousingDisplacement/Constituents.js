/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Placeholder } from "@hackoregon/component-library";
import { Fragment } from "react";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const ContentStorycard = () => (
  <Fragment>
    <p>Data constituent engagement definition</p>
    <Placeholder>
      <h2>Multimedia format here</h2>
    </Placeholder>
  </Fragment>
);
const ContentA = () => (
  <Fragment>
    <p>Data constituent engagement definition</p>
    <Placeholder>
      <h2>Multimedia format here</h2>
    </Placeholder>
  </Fragment>
);
const ContentB = () => (
  <Fragment>
    <p>Data constituent engagement definition</p>
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
