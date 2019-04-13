/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc
import React from "react";
import { connect } from "react-redux";

export function StoryPage() {
  return <div>Placeholder</div>;
}

StoryPage.displayName = "StoryPage";

const mapDispatch = () => ({});
const mapProps = () => ({});

export default connect(
  mapProps,
  mapDispatch
)(StoryPage);
