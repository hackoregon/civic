import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import SimpleCircle from "./SimpleCircle";

const policyContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f3f3f3;
  padding: 10px 0;
`;

const policyLink = css`
  color: #ee4950;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.25s ease-in-out;
  width: fit-content;
  margin: 0;
`;

const policyCircle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const legendScale = [6, 8, 9];

function PolicyText({ onClick, data, selected }) {
  return (
    <div
      className={policyContainer}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={policyCircle}>
        <SimpleCircle
          selected={selected}
          index={legendScale.findIndex(x => data.governments <= x)}
        />
      </div>
      <div>
        {selected ? (
          <div>
            <h2 className={policyLink}>{data.policy_name}</h2>
            <h5
              className={css`
                margin: 0;
              `}
            >
              {data.governments} governments
            </h5>
          </div>
        ) : (
          <div>
            <h3 className={policyLink}>{data.policy_name}</h3>
            <h6
              className={css`
                margin: 0;
              `}
            >
              {data.governments} governments
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}

PolicyText.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.shape({}),
  selected: PropTypes.bool
};

export default PolicyText;
