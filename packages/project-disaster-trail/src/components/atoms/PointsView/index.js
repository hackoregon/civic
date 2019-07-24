import React, { memo } from "react";
import { connect } from "react-redux";

const PointsView = ({ points }) => <h1>Points: {points}</h1>;

const mapStateToProps = ({ user }) => ({
  points: user.points
});

export default memo(connect(mapStateToProps)(PointsView));
