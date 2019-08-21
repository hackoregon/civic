/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState, memo, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { map } from "lodash";
import styled from "@emotion/styled";

import remove from "lodash/remove";
import { palette } from "../../constants/style";
import useBounds from "../../state/hooks/useBounds";
import usePrevious from "../../state/hooks/usePrevious";
import useAnimationFrame from "../../state/hooks/useAnimationFrame";

import Orb from "./Orb";
import { addItemToPlayerKit, getKitCreationItems } from "../../state/kit";
import { addPoints } from "../../state/user";
import {
  completedOrbHandler,
  createOrbsFromKit,
  uncompletedOrbHandler
} from "./OrbManagerHelpers";
import { getActiveTaskData } from "../../state/tasks";

const ORB_CONFIG = {
  period: 2,
  orbCount: 10,
  orbSize: 40,
  maxVelocityY: 0,
  minVelocityX: 0.1,
  minVelocityY: 0.1,
  maxVelocityX: 2
};

/**
 * OrbManager is responsible for moving Orbs
 *
 * @param {*} { orbCount=2 } how many orbs should be rendered?
 * @param {*} { velocityX=2 } how fast does the orb move horizontally
 * @param {*} { velocityY=0 } how fast does the orb move vertically
 * @param {*} { period=2 } how much vertical modulation per frame should the orb move? Higher number = more 'wobbly'
 * @returns
 */
const OrbManager = ({
  kitItems,
  activeTask,
  addItemToPlayerKitInState,
  addPointsToState
} = {}) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [orbs, setOrbsState] = useState([]);
  const [touchedOrbs, setTouchedOrb] = useState([]);
  const [completedOrbs, setCompletedOrbs] = useState([]);
  // tick is used to modulate movement based on an incrementing value
  const [tick, setTick] = useState(0);

  // the boundaries of the OrbManagers area
  const boundsRef = useRef();
  const bounds = useBounds(boundsRef);
  const prevBounds = usePrevious(bounds);

  // a reference to the previous state's bounds
  // used to control when the orbs are initialized:
  // specifically when there were no bounds in prev state but there are bounds in current state
  // which should only happen once, after the component renders the very first time

  // Initializes the orb data and placement. Only reexecutes when "bounds" is updated (screen resize)
  useEffect(() => {
    // ensure we only run this once
    if (prevBounds && !prevBounds.width && bounds.width && !hasInitialized) {
      const newOrbs = createOrbsFromKit(kitItems, bounds, ORB_CONFIG);
      setHasInitialized(true);
      setOrbsState(newOrbs);
    }
  }, [bounds]);

  // `animate` is called every frame
  // eslint-disable-next-line consistent-return
  const animate = () => {
    if (!bounds || !bounds.width || !hasInitialized) return null;

    const tempModels = [];
    // we re-use tempModels by pushing updated data in to it.
    for (let i = 0; i < orbs.length; i += 1) {
      // get the model
      let currentOrb = { ...orbs[i] };
      const currentOrbId = currentOrb.orbId;

      // if the orb is touched or complete, do not move it
      // TODO: seperate out orb animation when good / bad
      if (touchedOrbs.indexOf(currentOrbId) > -1) {
        tempModels.push(currentOrb);
        // eslint-disable-next-line no-continue
        continue;
      } else if (completedOrbs.indexOf(currentOrbId) > -1) {
        completedOrbHandler(completedOrbs, currentOrb, activeTask, tick);
      } else {
        currentOrb = uncompletedOrbHandler(currentOrb, tick, i, ORB_CONFIG);
      }

      // is it offscreen?
      if (currentOrb.x < -ORB_CONFIG.orbSize) currentOrb.x += bounds.width;
      if (currentOrb.x > bounds.width)
        currentOrb.x -= bounds.width + ORB_CONFIG.orbSize;

      if (currentOrb.y < -ORB_CONFIG.orbSize) currentOrb.y += bounds.height;
      if (currentOrb.y > bounds.height)
        currentOrb.y -= bounds.height + ORB_CONFIG.orbSize;

      // store the updated model.
      tempModels.push(currentOrb);
    }

    // store all models in state
    setOrbsState(tempModels);

    setTick(tick + 1);
  };

  useAnimationFrame(() => animate());

  const addOrbScore = orb => {
    if (orb.good) {
      addItemToPlayerKitInState(orb.type);
      addPointsToState(orb.points);
    }
  };

  const setOrbTouched = (orb, isTouched) => {
    const { orbId } = orb;

    if (isTouched) {
      setTouchedOrb(prevOrbs => [...prevOrbs, orbId]);
      return;
    }

    const updatedOrbs = remove(
      touchedOrbs,
      touchedOrb => touchedOrb.orbId === orbId
    );
    setTouchedOrb(updatedOrbs);
  };

  const setOrbComplete = orb => {
    const { orbId } = orb;
    setCompletedOrbs(prevOrbs => [...prevOrbs, orbId]);
  };

  return (
    <OrbsStyle ref={boundsRef}>
      {map(orbs, (orb, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            transform: `translate(${orb.x}px, ${orb.y}px)`
          }}
        >
          <Orb
            orb={orb}
            size={ORB_CONFIG.orbSize}
            addOrbScore={addOrbScore}
            setOrbTouched={setOrbTouched}
            setOrbComplete={setOrbComplete}
          />
        </div>
      ))}
    </OrbsStyle>
  );
};

OrbManager.displayName = "OrbManager";

const OrbsStyle = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${palette.blue};
`;

const mapStateToProps = state => ({
  kitItems: getKitCreationItems(state),
  activeTask: getActiveTaskData(state) // This should be passed through from the parent component
});

const mapDispatchToProps = dispatch => ({
  addPointsToState: bindActionCreators(addPoints, dispatch),
  addItemToPlayerKitInState: bindActionCreators(addItemToPlayerKit, dispatch)
});

// use memo to not re-render OrbManager unless its props change
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(OrbManager));
