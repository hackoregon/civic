/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { NotebookPreview } from "@hackoregon/component-library";
import { Fragment } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import MathJax from "react-mathjax";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const ContentCard = () => (
  <Fragment>
    <p>
      This analysis aggregates tract-level population data by race from NCDB
      across the 4-county Portland region (Multnomah, Washington, Clackamas and
      Clark, WA); and across a subset of tracts in this case defined by those
      have 1990 black populations shares above an adjustable threshold - ranging
      from 10% to 60%.
    </p>
    <NotebookPreview link="https://github.com/hackoregon/2019-disaster-resilience-data-science/blob/master/notebooks/AEBM_Casualties_Analysis.ipynb" />
    <h3>Key calculations</h3>
    <p
      css={css`
        line-height: 1.6;
      `}
    >
      <MathJax.Provider>
        <MathJax.Node
          block
          formula="SL_{ENDOi} = N_{DO} \times P(S_i|Col)P(Col|PSTR_5) \times PSTR_5"
        />
        Where:
        <br />
        <MathJax.Node inline formula="SL_{ENDOi}" /> = Some variable
        <br />
        <MathJax.Node inline formula="P(S_i|Col)" /> = Some probability
        <br />
        <MathJax.Node inline formula="P(Col|PSTR_5)" /> = Some other probability
        <br />
        <MathJax.Node inline formula="PSTR5" /> = Even another probability
        <br />
        <MathJax.Node inline formula="N_{DO}" /> = A number of some kind
      </MathJax.Provider>
    </p>
  </Fragment>
);

const Methodology = () => (
  <AccordianContentContainer>
    <DataTabs Storycard={ContentCard} />
  </AccordianContentContainer>
);

export default Methodology;
