import React, { memo } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";

const PointsView = ({ points }) => <h1>Points: {points}</h1>;

const mapStateToProps = ({ user }) => ({
  points: user.points
});

export const PointsViewStyle = styled(PointsView)`
  position: absolute;
  top: 0;
  right: 0;
  border: 10px solid red;
  z-index: 1;
`;

export default connect(mapStateToProps)(memo(PointsViewStyle));
