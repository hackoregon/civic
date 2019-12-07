/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { string, shape } from "prop-types";
import { Fragment } from "react";
import CivicSandboxDashboard from "../CivicSandboxDashboard/CivicSandboxDashboard";

const SandboxDrawerVisualization = props => {
  const {
    selectedPackage,
    selectedPackageDescription,
    selectedFoundationDatum
  } = props;

  return (
    <Fragment>
      <div
        css={css(`
            position: relative;
            z-index: 900;
          `)}
      >
        <div css={css(`margin: 0 10px;`)}>
          <h2>
            <span role="img" aria-label="Map Layers">
              📉
            </span>{" "}
            Data Detail
          </h2>
          <h3>{selectedPackage}</h3>
          <p>{selectedPackageDescription}</p>
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
  selectedPackageDescription: string,
  selectedFoundationDatum: shape({})
};
