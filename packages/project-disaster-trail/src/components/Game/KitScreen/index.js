import React, { memo } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { getKitCreationItems } from "../../../state/kit";
import DurationBar from "../../atoms/DurationBar";
import PointsView from "../../atoms/PointsView";
import { MapStyle, GUIStyle } from "../index";
import OrbManager from "../OrbManager";
import Kit from "./Kit";

const KitScreen = ({ possibleItems }) => {
  return (
    <>
      <MapStyle>
        <Kit />
        <PointsView />
      </MapStyle>
      <DurationBar step="Choose supplies" />
      <GUIStyle>
        <OrbManager possibleItems={possibleItems} />
      </GUIStyle>
    </>
  );
};

KitScreen.propTypes = {
  possibleItems: PropTypes.arrayOf(
    PropTypes.shape({
      imageSVG: PropTypes.string,
      good: PropTypes.bool,
      onSelection: PropTypes.func,
      weighting: PropTypes.number
    })
  )
};

const mapStateToProps = state => ({
  possibleItems: getKitCreationItems(state)
});

export default connect(mapStateToProps)(memo(KitScreen));
