import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getKitCreationItems, addItemToPlayerKit } from "../../../state/kit";
import { addPoints } from "../../../state/user";
import DurationBar from "../../atoms/DurationBar";
import Ticker from "../../atoms/Ticker";
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

  const checkIfItemIsGood = kitItem => kitItem.good;

  return (
    <>
      <MapStyle>
        <Kit />
      </MapStyle>
      <DurationBar step="Choose supplies" />
      <Ticker text="Ticker tape text that goes across the screen to give instructions" />
      <GUIStyle>
        <OrbManager
          possibleItems={possibleItems}
          onOrbSelection={onKitItemSelection}
          checkItemIsCorrect={checkIfItemIsGood}
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
