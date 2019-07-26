/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState, memo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { map } from "lodash";

import { addPoints } from "../../state/user";

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
  period = 2,
  orbCount = 10,
  orbSize = 25,
  minVelocityX = 0.1,
  minVelocityY = 0.1,
  maxVelocityX = 2,
  maxVelocityY = 0,
  addPoints,
  interfaceHeight
}) => {
  // create an empty array.
  let tempModels = [];

  // tick is used to modulate movement based on an incrementing value
  let tick = 0;

  for (let i = 0, model; i < orbCount; i += 1) {
    // create an empty object and assign position and velocity
    model = {};
    model.x = Math.random() * window.innerWidth;
    model.y = Math.random() * (interfaceHeight - orbSize);

    model.velocity = {
      x: minVelocityX + Math.random() * (maxVelocityX - minVelocityX),
      y: minVelocityY + Math.random() * (maxVelocityY - minVelocityY)
    };

    // store in the temporary array
    tempModels.push(model);
  }

  // store the temp values in state
  const [models, setModels] = useState(tempModels);

  const onOrbTouch = id => {
    // const model = models[id];
    // console.log("orb touched,  ", id);
  };

  const onOrbComplete = id => {
    console.log("complete ", id);
    addPoints(1);
  };

  useEffect(() => {
    let animationFrameId;

    // `animate` is called every frame
    const animate = () => {
      // we re-use tempModels by pushing updated data in to it.
      tempModels = [];
      for (let i = 0, model; i < orbCount; i += 1) {
        // get the model
        model = models[i];

        // and move it
        model.x += model.velocity.x; // + Math.cos(tick * 0.1) * period;
        model.y += model.velocity.y + Math.sin((tick + i) * 0.1) * period;

        // is it offscreen?
        if (model.x < -orbSize) model.x += window.innerWidth;
        if (model.x > window.innerWidth) model.x = 0;

        if (model.y < -orbSize) model.y += interfaceHeight;
        if (model.y > interfaceHeight + orbSize) model.y = orbSize / 2;

        // store the updated model.
        tempModels.push(model);
      }

      // store all models in state
      setModels(tempModels);

      tick += 1;

      // this triggers the `animate` function to be called every frame.
      animationFrameId = window.requestAnimationFrame(animate);
    };

    // start the animation!
    animate();

    // clean up values on unload
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // this is the render method
  // simply wrap Orb with some styling that moves it
  return map(models, (model, index) => (
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
  ));
};

OrbManager.displayName = "OrbManager";

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({
  addPoints: bindActionCreators(addPoints, dispatch)
  // setPlaying: bindActionCreators(settings.setPlaying, dispatch),
});

// use memo to not re-render OrbManager unless its props change
export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrbManager)
);
