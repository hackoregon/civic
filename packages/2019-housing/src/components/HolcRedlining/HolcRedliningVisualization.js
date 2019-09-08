import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";

// import { BaseMap } from "@hackoregon/component-library";
import TempLoader from "../TempLoader/TempLoader";

const HolcRedliningVisualization = ({ data }) => {
  if (!isLoaded(data.redliningMap)) return <TempLoader />;

  return (
    data && (
      <span>
        <strong style={{ color: "crimson" }}>
          Visualization TODO:
          <ul>
            <li>
              Replace this image with a real redlining map when the data is
              added to sandbox
            </li>
          </ul>
        </strong>
        <br />
        <img
          style={{ width: "100%" }}
          src="https://miro.medium.com/max/2400/1*JxaHEeB5vrbgL96QJi3WdA.png"
          alt="Portland HOLC Redlining Map"
        />
      </span>
    )
  );
};

HolcRedliningVisualization.propTypes = {
  data: PropTypes.shape({ redliningMap: resourceShape })
};

export default HolcRedliningVisualization;
