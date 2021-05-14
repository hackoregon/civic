/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import { BrandColors } from "@hackoregon/component-library";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const ContentStorycard = () => (
  <Fragment>
    <h3>Data use guidelines</h3>
    <div
      css={css`
        display: flex;
      `}
    >
      <WarningIcon
        fontSize="small"
        css={css`
          margin: 1.25rem 0.5rem 0 1rem;
          color: ${BrandColors.error.hex};
        `}
      />
      <h4>
        This analysis combines datasets that use differing indicators for race
        which can result in under-counting people of multiple and marginalized
        ethnicities.
      </h4>
    </div>
    <h3>Governance report</h3>
    <p>
      <em>
        A synthesis of risks, opportunities, and guidelines in the use of this
        analysis
      </em>
    </p>
    <p>
      This analysis makes it possible for Portland residents to see the loss of
      historically black communities. It creates a data-informed foundation to
      support the lived experiences of current and former residents and opens up
      the conversation for how to better invest in these communities.
    </p>
    <h4>
      <a href="#">Read full report</a>
    </h4>
  </Fragment>
);
const ContentA = () => (
  <Fragment>
    <h3>Data use guidelines</h3>
    <div
      css={css`
        display: flex;
      `}
    >
      <WarningIcon
        fontSize="small"
        css={css`
          margin: 1.25rem 0.5rem 0 1rem;
          color: ${BrandColors.error.hex};
        `}
      />
      <h4>
        This dataset records people of multiple ethnicities as “biracial”
        resulting in under-counting of minority or marginalized ethnicities.
      </h4>
    </div>
    <h3>Governance report</h3>
    <p>
      <em>
        A synthesis of risks, opportunities, and guidelines in the use of this
        analysis
      </em>
    </p>
    <h4>
      <a href="#">Read full report</a>
    </h4>
  </Fragment>
);
const ContentB = () => (
  <Fragment>
    <h3>Data use guidelines</h3>
    <div
      css={css`
        display: flex;
      `}
    >
      <WarningIcon
        fontSize="small"
        css={css`
          margin: 1.25rem 0.5rem 0 1rem;
          color: ${BrandColors.error.hex};
        `}
      />
      <h4>
        This dataset is the result of data integration between two datasets that
        are not publicly accessible
      </h4>
    </div>
    <h3>Governance report</h3>
    <p>
      <em>
        A synthesis of risks, opportunities, and guidelines in the use of this
        analysis
      </em>
    </p>
    <h4>
      <a href="#">Read full report</a>
    </h4>
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
