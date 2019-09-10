import React, { memo } from "react";
import { PropTypes } from "prop-types";

import { connect } from "react-redux";
import styled from "@emotion/styled";

import { palette } from "../../../constants/style";

const PointsContainer = styled.div`
  display: grid;
  align-items: center;
  height: 100%;
  margin-top: 20px;
  padding: 20px;
  background: ${palette.white};
  border-radius: 150px;
  text-align: center;
  /* Just guessing here as shadow is baked into raster in comp */
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.15);

  h2 {
    margin: 0;
    font-family: "Boogaloo", cursive;
    font-size: 10rem;
    color: ${palette.blue};
  }

  .red {
    color: ${palette.red};
  }
`;

const PointsView = ({ points }) => (
  <PointsContainer>
    <h2>
      Points <span className="red">{points}</span>
    </h2>
  </PointsContainer>
);

PointsView.propTypes = {
  points: PropTypes.number
};

const mapStateToProps = ({ user }) => ({
  points: user.points
});

export default connect(mapStateToProps)(memo(PointsView));
