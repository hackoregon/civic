/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState, memo, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { map } from "lodash";
import styled from "@emotion/styled";

import useBounds from "../../state/hooks/useBounds";
import usePrevious from "../../state/hooks/usePrevious";
import useAnimationFrame from "../../state/hooks/useAnimationFrame";

import { getOrbsTouched, getOrbsComplete } from "../../state/orbs";

import Orb from "./Orb";
import { addItemToPlayerKit, getKitCreationItems } from "../../state/kit";
import { addPoints } from "../../state/user";

function createOrbsFromKit(kitItems, bounds, config) {
  if (!kitItems.length) {
    return [];
  }

  // create an empty array.
  const orbCollection = [];
  // create a number of orbs based on each kitItems weighting to achieve the correct distribution. Add the x, y, and velocity properties to its existing properties for that item
  for (let i = 0; i < kitItems.length; i += 1) {
    const kitData = kitItems[i];
    const totalGeneratedOrbs = Math.round(config.orbCount * kitData.weighting);

    for (let j = 0; j < totalGeneratedOrbs; j += 1) {
      const orbId = `${kitData.type}-${j}`;
      kitData.x = Math.random() * bounds.width;
      kitData.y = Math.random() * (bounds.height - config.orbSize / 2);
      kitData.velocity = {
        x:
          config.minVelocityX +
          Math.random() * (config.maxVelocityX - config.minVelocityX),
        y:
          config.minVelocityY +
          Math.random() * (config.maxVelocityY - config.minVelocityY)
      };

      orbCollection.push(
        Object.assign({}, { orbId }, { touched: false }, kitData)
      );
    }
  }

  return orbCollection;
}

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
  touchedOrbs,
  completedOrbs,
  addItemToPlayerKitInState,
  addPointsToState
} = {}) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [orbs, setOrbsState] = useState([]);
  // const [touchedOrbs, setTouchedOrb] = useState([]);
  // const [completedOrbs, setCompletedOrbs] = useState([]);
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
    for (let i = 0, model; i < orbs.length; i += 1) {
      // get the model
      model = { ...orbs[i] };

      // if the orb is touched or complete, do not move it
      // TODO: seperate out orb animation when good / bad
      if (touchedOrbs.indexOf(i) > -1 || completedOrbs.indexOf(i) > -1) {
        tempModels.push(model);
        // eslint-disable-next-line no-continue
        continue;
      }

      // and move it
      model.x += model.velocity.x; // + Math.cos(tick * 0.1) * period;
      model.y +=
        model.velocity.y + Math.sin((tick + i) * 0.1) * ORB_CONFIG.period;

      // is it offscreen?
      if (model.x < -ORB_CONFIG.orbSize) model.x += bounds.width;
      if (model.x > bounds.width) model.x -= bounds.width + ORB_CONFIG.orbSize;

      if (model.y < -ORB_CONFIG.orbSize) model.y += bounds.height;
      if (model.y > bounds.height)
        model.y -= bounds.height + ORB_CONFIG.orbSize;

      // store the updated model.
      tempModels.push(model);
    }

    // store all models in state
    setOrbsState(tempModels);

    setTick(tick + 1);
  };

  useAnimationFrame(() => animate());

  // this is the render method
  // simply wrap Orb with some styling that moves it
  //
  // const getOrbById = id => {
  //   return orbs.find(orb => orb.id === id);
  // };

  const addOrbScore = orb => {
    if (orb.good) {
      addItemToPlayerKitInState(orb.type);
      addPointsToState(orb.points);
    }
  };

  const setOrbTouched = (touchedOrbId, isTouched) => {
    const orb = getOrbById(touchedOrbId);
    if (isTouched) {
      orb.touched = true;
      setTouchedOrb(oldSet => [...oldSet, touchedOrb]);
      return;
    }


  };
  //
  // const setOrbComplete = (completedOrbId, isComplete) => {
  //
  // };

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
            id={index}
            size={ORB_CONFIG.orbSize}
            orb={orb}
            addOrbScore={addOrbScore}
            // setOrbTouchedInState={setOrbTouchedInState}
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
`;

const mapStateToProps = state => ({
  touchedOrbs: getOrbsTouched(state),
  completedOrbs: getOrbsComplete(state),
  kitItems: getKitCreationItems(state)
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
