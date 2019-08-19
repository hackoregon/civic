import React, { useState, Children } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

const toggleStyle = css`
  padding: 10px;
  border-bottom: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  display: block;
  text-align: center;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  font-size: 1em;
`;

function Collapsable({ children }) {
  const [expanded, setExpanded] = useState(false);
  const cta = expanded ? "Less" : "More";
  const arrow = expanded ? "up" : "down";
  const unhiddenChildren = Children.toArray(children).filter(
    child => !child.props.hidden
  );
  const hiddenChildren = Children.toArray(children).filter(
    child => child.props.hidden
  );

  return (
    <div>
      {unhiddenChildren}
      {expanded && hiddenChildren}
      {hiddenChildren.length > 0 && (
        // eslint-disable-next-line
        <a className={toggleStyle} onClick={() => setExpanded(!expanded)}>
          {cta}
          <span
            style={{ display: "block" }}
            className={`fa fa-arrow-${arrow}`}
          />
        </a>
      )}
    </div>
  );
}

const Section = ({ children }) => children;

Collapsable.Section = Section;

Collapsable.propTypes = {
  children: PropTypes.node
};

export default Collapsable;
