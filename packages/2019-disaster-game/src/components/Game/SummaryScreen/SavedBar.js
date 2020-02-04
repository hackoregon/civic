/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSavedMetrics as _getSavedMetrics } from "../../../state/tasks";
import { palette } from "../../../constants/style";

const containerStyle = css`
  height: 130px;
  width: 535px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-content: center;
  justify-self: end;
  z-index: 10;
  justify-content: space-between;
  top: 90px;
  right: 150px;
  position: absolute;
  transition: all 1s;
`;

const labelStyle = css`
  font-family: "Akkurat", sans-serif;
  font-size: 4rem;
  color: ${palette.darkGrey};
  margin: 0;
  line-height: 130px;
  vertical-align: middle;
`;

const savedNumber = css`
  font-family: "Akkurat", sans-serif;
  font-size: 4.5rem;
  color: ${palette.darkGrey};
  display: inline-block;
  transition: all 1s;
  transform: scale(1);
  margin-right: unset;
`;

const SavedBar = ({ initialSummaryStyle, newSavedMetrics }) => {
  const [savedMetrics, setSavedMetrics] = useState({
    people: 0,
    pets: 0
  });

  useEffect(() => {
    setSavedMetrics(newSavedMetrics);
  }, [newSavedMetrics]);

  return (
    <div
      css={css`
        ${containerStyle};
        ${initialSummaryStyle || ""}
      `}
    >
      <p css={labelStyle}>
        People <span css={savedNumber}>{savedMetrics.people}</span>
      </p>
      <p css={labelStyle}>
        Pets <span css={savedNumber}>{savedMetrics.pets}</span>
      </p>
    </div>
  );
};

SavedBar.propTypes = {
  initialSummaryStyle: PropTypes.shape({}),
  newSavedMetrics: PropTypes.shape({
    people: PropTypes.number,
    pets: PropTypes.number
  })
};

const mapStateToProps = state => ({
  newSavedMetrics: _getSavedMetrics(state)
});

export default connect(mapStateToProps)(SavedBar);
