/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState, memo, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { map } from "lodash";
import styled from "@emotion/styled";

import { addPoints } from "../../state/user";
import useBounds from "../../state/hooks/useBounds";
import usePrevious from "../../state/hooks/usePrevious";
import useAnimationFrame from "../../state/hooks/useAnimationFrame";

import {
  getOrbCount,
  getOrbSize,
  getPeriod,
  getVelocityRange
} from "../../state/settings";

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
  addPoints
} = {}) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  useAnimationFrame(() => animate());

  // store references to all models
  const [models, setModels] = useState([]);
  const prevModels = usePrevious(models);

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
      setModels(tempModels);
      setHasInitialized(true);
    }
  }, [bounds]);

  // useEffect(() => {
  //   if (!paused) {
  //     animate();
  //   }
  // }, [paused]);

  // useEffect(() => {
  //   if (isAnimating) {
  //     animate();
  //   }
  // }, [isAnimating]);

  useEffect(() => {
    if (prevModels && !prevModels.length && models.length && !isAnimating) {
      setIsAnimating(true);
    }
  }, [models]);

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
      // get the model
      model = models[i];

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
    setModels(tempModels);

    setTick(tick + 1);
  };

  const onOrbTouch = id => {
    // const model = models[id];
    // console.log("orb touched,  ", id);
  };

  const onOrbComplete = id => {
    console.log("complete ", id);
    addPoints(1);
  };

  // this is the render method
  // simply wrap Orb with some styling that moves it
  return (
    <OrbsStyle ref={boundsRef}>
      {map(models, (model, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            transform: `translate(${model.x}px, ${model.y}px)`
          }}
        >
          <Orb
            size={orbSize}
            onOrbTouch={onOrbTouch}
            onComplete={onOrbComplete}
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
  velocityRange: getVelocityRange(state)
});

const mapDispatchToProps = dispatch => ({
  addPoints: bindActionCreators(addPoints, dispatch)
  // setPlaying: bindActionCreators(settings.setPlaying, dispatch),
});

// use memo to not re-render OrbManager unless its props change
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(OrbManager));
