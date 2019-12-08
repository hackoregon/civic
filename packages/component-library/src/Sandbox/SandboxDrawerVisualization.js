/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { string, shape } from "prop-types";
import { Fragment } from "react";
import CivicSandboxDashboard from "../CivicSandboxDashboard/CivicSandboxDashboard";

const SandboxDrawerVisualization = props => {
  const { selectedPackage, selectedFoundationDatum } = props;

  return (
    <Fragment>
      <div
        css={css(`
            position: relative;
            z-index: 900;
          `)}
      >
        <div css={css(`margin: 0 10px;`)}>
          <h2>{selectedPackage}</h2>
          <p>
            This is a brief description of the selected package, what data sets
            it uses
          </p>
        </div>
      </div>
      <CivicSandboxDashboard
        data={selectedFoundationDatum}
        isDashboardOpen
        standalone
      />
    </Fragment>
  );
};

export default SandboxDrawerVisualization;

SandboxDrawerVisualization.propTypes = {
  selectedPackage: string,
  selectedFoundationDatum: shape({})
};
