/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSavedMetrics as _getSavedMetrics } from "../../../state/tasks";
import { palette } from "../../../constants/style";

const containerStyle = css`
  height: 130px;
  width: 700px;
  background-color: ${palette.lemon};
  display: grid;
  grid-template-columns: repeat(3, auto);
  padding: 0 80px;
  border-radius: 80px;
  align-content: center;
  justify-content: space-between;
  justify-self: end;
  z-index: 10;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.15);
`;

const summaryStyle = css`
  top: 90px;
  right: 40px;
  position: absolute;
  transition: all 1s;
`;

const justifyRightStyle = css`
  margin-top: 10px;
  margin-right: 60px;
`;

const headerStyle = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 4rem;
  line-height: 3.75rem;
  color: ${palette.blue};
  margin: 0;
  padding: 0;
`;

const labelStyle = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 4rem;
  color: ${palette.blue};
  margin: 0;
  line-height: 130px;
  vertical-align: middle;
`;

const savedNumber = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 4.5rem;
  color: ${palette.red};
  display: inline-block;
  transition: all 1s;
  transform: scale(1);
  margin-right: unset;
`;

const SavedBar = ({
  justifyRight,
  isSummary,
  initialSummaryStyle,
  newSavedMetrics
}) => {
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
        ${justifyRight && justifyRightStyle};
        ${isSummary ? summaryStyle : ""}
        ${initialSummaryStyle || ""}
      `}
    >
      <p css={headerStyle}>
        You
        <br />
        Saved
      </p>
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
  justifyRight: PropTypes.bool,
  isSummary: PropTypes.bool,
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
