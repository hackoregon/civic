/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState, memo, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { map } from "lodash";
import styled from "@emotion/styled";

import useBounds from "../../state/hooks/useBounds";
import usePrevious from "../../state/hooks/usePrevious";
import useAnimationFrame from "../../state/hooks/useAnimationFrame";

import {
  getOrbCount,
  getOrbSize,
  getPeriod,
  getVelocityRange
} from "../../state/settings";
import {
  getOrbs,
  setOrbs,
  getOrbsTouched,
  getOrbsComplete
} from "../../state/orbs";

import Orb from "./Orb";

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
  orbs,
  setOrbs,
  paused = false,
  period = 2,
  orbCount = 10,
  orbSize = 25,
  velocityRange: {
    minVelocityX = 0.1,
    minVelocityY = 0.1,
    maxVelocityX = 2,
    maxVelocityY = 0
  } = {},
  touchedOrbs,
  completedOrbs
} = {}) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  useAnimationFrame(() => animate());

  // store references to all models
  const prevModels = usePrevious(orbs);

  // tick is used to modulate movement based on an incrementing value
  const [tick, setTick] = useState(0);

  // store reference to requestAnimationFrame for memory management purposes
  const animationFrameId = null;

  // the boundaries of the OrbManagers area
  const boundsRef = useRef();
  const bounds = useBounds(boundsRef);
  // a reference to the previous state's bounds
  // used to control when the orbs are initialized:
  // specifically when there were no bounds in prev state but there are bounds in current state
  // which should only happen once, after the component renders the very first time
  const prevBounds = usePrevious(bounds);

  useEffect(() => {
    // ensure we only run this once
    if (prevBounds && !prevBounds.width && bounds.width && !hasInitialized) {
      // create an empty array.
      const tempModels = [];

      for (let i = 0, model; i < orbCount; i += 1) {
        // create an empty object and assign position and velocity
        model = {};
        model.x = Math.random() * bounds.width;
        model.y = Math.random() * (bounds.height - orbSize / 2);

        model.velocity = {
          x: minVelocityX + Math.random() * (maxVelocityX - minVelocityX),
          y: minVelocityY + Math.random() * (maxVelocityY - minVelocityY)
        };

        // store in the temporary array
        tempModels.push(model);
      }
      setOrbs(tempModels);
      setHasInitialized(true);
    }
  }, [bounds]);

  useEffect(() => {
    if (prevModels && !prevModels.length && orbs.length && !isAnimating) {
      setIsAnimating(true);
    }
  }, [orbs]);

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // `animate` is called every frame
  const animate = () => {
    if (!bounds || !bounds.width || paused || !isAnimating) return null;

    const tempModels = [];

    // we re-use tempModels by pushing updated data in to it.
    for (let i = 0, model; i < orbCount; i += 1) {
      model = { ...orbs[i] };

      // if the orb is touched or complete, do not move it
      if (touchedOrbs.indexOf(i) > -1 || completedOrbs.indexOf(i) > -1) {
        tempModels.push(model);
        continue;
      }
      // get the model

      // and move it
      model.x += model.velocity.x; // + Math.cos(tick * 0.1) * period;
      model.y += model.velocity.y + Math.sin((tick + i) * 0.1) * period;

      // is it offscreen?
      if (model.x < -orbSize) model.x += bounds.width;
      if (model.x > bounds.width) model.x -= bounds.width + orbSize;

      if (model.y < -orbSize) model.y += bounds.height;
      if (model.y > bounds.height) model.y -= bounds.height + orbSize;

      // store the updated model.
      tempModels.push(model);
    }

    // store all models in state
    setOrbs(tempModels);

    setTick(tick + 1);
  };

  // this is the render method
  // simply wrap Orb with some styling that moves it
  return (
    <OrbsStyle ref={boundsRef}>
      {map(orbs, (model, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            transform: `translate(${model.x}px, ${model.y}px)`
          }}
        >
          <Orb
            size={orbSize}
            // onComplete={onOrbComplete}
            id={index}
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
  orbCount: getOrbCount(state),
  orbSize: getOrbSize(state),
  period: getPeriod(state),
  velocityRange: getVelocityRange(state),
  orbs: getOrbs(state),
  touchedOrbs: getOrbsTouched(state),
  completedOrbs: getOrbsComplete(state)
});

const mapDispatchToProps = dispatch => ({
  setOrbs: bindActionCreators(setOrbs, dispatch)
});

// use memo to not re-render OrbManager unless its props change
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(OrbManager));
