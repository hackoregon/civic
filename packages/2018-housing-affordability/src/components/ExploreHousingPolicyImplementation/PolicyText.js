import React from 'react';
import { css } from 'emotion';
import SimpleCircle from './SimpleCircle';

const policyContainer = css`
  width: 100%;
`;

const policyLink = css`
  color: #ee4950;
  border-bottom: 2px solid;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.25s ease-in-out;
  width: fit-content;
`;

const legendScale = [7, 15, 99];

function PolicyText({ onClick, data, selected }) {
  return (
    <div className={policyContainer} onClick={onClick}>
      {selected ? (
        <h2 className={policyLink}>
          <SimpleCircle
            selected={selected}
            index={legendScale.findIndex(x => data.governments <= x)}
          />
          {data.policy_name}
        </h2>
      ) : (
        <h3 className={policyLink}>
          <SimpleCircle
            selected={selected}
            index={legendScale.findIndex(x => data.governments <= x)}
          />
          {data.policy_name}
        </h3>
      )}
    </div>
  );
}

export default PolicyText;
