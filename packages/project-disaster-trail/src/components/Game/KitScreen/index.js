import React, { memo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PropTypes } from "prop-types";

import { getKitCreationItems, addItemToPlayerKit } from "../../../state/kit";
import { addPoints } from "../../../state/user";
import DurationBar from "../../atoms/DurationBar";
import PointsView from "../../atoms/PointsView";
import { MapStyle, GUIStyle } from "../index";
import OrbManager from "../OrbManager";
import Kit from "./Kit";

const KitScreen = ({
  possibleItems,
  addPointsToState,
  addItemToPlayerKitInState
}) => {
  const onKitItemSelection = kitItem => {
    if (kitItem.good) {
      addItemToPlayerKitInState(kitItem.type);
      addPointsToState(kitItem.points);
    }
    return kitItem.good;
  };

  return (
    <>
      <MapStyle>
        <Kit />
        <PointsView />
      </MapStyle>
      <DurationBar step="Choose supplies" />
      <GUIStyle>
        <OrbManager
          possibleItems={possibleItems}
          onOrbSelection={onKitItemSelection}
        />
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
  ),
  addPointsToState: PropTypes.func,
  addItemToPlayerKitInState: PropTypes.func
};

const mapStateToProps = state => ({
  possibleItems: getKitCreationItems(state)
});

const mapDispatchToProps = dispatch => ({
  addPointsToState: bindActionCreators(addPoints, dispatch),
  addItemToPlayerKitInState: bindActionCreators(addItemToPlayerKit, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(KitScreen));
