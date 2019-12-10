/* eslint-disable import/no-extraneous-dependencies */

/** @jsx jsx */
import { useState, Children, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { jsx, css } from "@emotion/core";

// To do: replace color with link color when in brand theme
const toggleStyle = css`
  background: none;
  color: rgb(30, 98, 189);
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
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

const hiddenStyle = css`
  outline: 0;
`;

const visuallyHidden = css`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; /* added line */
`;

function Collapsable({ children, description }) {
  const hiddenRef = useRef(null);
  const buttonRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const cta = expanded
    ? "I want to use a different map type"
    : "Choose this map type";
  const unhiddenChildren = Children.toArray(children).filter(
    child => !child.props.hidden
  );
  const hiddenChildren = Children.toArray(children).filter(
    child => child.props.hidden
  );

  function handleClick(isExpanded) {
    setExpanded(!isExpanded);
    if (isExpanded) {
      buttonRef.current.focus();
    } else {
      hiddenRef.current.focus();
    }
  }

  return (
    <Fragment>
      {unhiddenChildren}
      <div css={hiddenStyle} role="group" tabIndex="-1" ref={hiddenRef}>
        {expanded && hiddenChildren}
      </div>
      {hiddenChildren.length > 0 && (
        <button
          css={toggleStyle}
          onClick={() => handleClick(expanded)}
          type="button"
          aria-live="polite"
          ref={buttonRef}
        >
          {cta}
          <span css={visuallyHidden}>{description}</span>
        </button>
      )}
    </Fragment>
  );
}

const Section = ({ children }) => children;

Collapsable.Section = Section;

Collapsable.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string.isRequired
  // description for screen readers
  // will announce as "more (description)" or "less (description)"
};

export default Collapsable;
