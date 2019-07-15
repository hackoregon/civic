/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState, memo } from "react";
import { map } from "lodash";

import Orb from "./Orb";

// OrbManager is responsible for moving Orbs

const OrbManager = ({ ratios }) => {
  // first create an empty array.
  let tempModels = [];

  // tick is used to modulate movement based on an incrementing value
  let tick = 0;

  // how big is the circle the orbs 'float' up and down in
  const period = 2;

  for (let i = 0, model; i < ratios.orbCount; i += 1) {
    // create an empty object and assign position and velocity
    model = {};
    model.x = Math.random() * window.innerWidth;
    model.y =
      Math.random() * (ratios.interfaceHeight - ratios.orbSize) +
      ratios.orbSize;

    model.velocity = {
      x: (Math.random() - 2) * 2,
      y: 0 // (Math.random() - 1) * 10
    };

    // store in the temporary array
    tempModels.push(model);
  }

  // store the temp values in state
  const [models, setModels] = useState(tempModels);

  useEffect(() => {
    let animationFrameId;

    // `animate` is called every frame
    const animate = () => {
      // we re-use tempModels by pushing updated data in to it.
      tempModels = [];
      for (let i = 0, model; i < ratios.orbCount; i += 1) {
        // get the model
        model = models[i];

        // and move it
        model.x += model.velocity.x; // + Math.cos(tick * 0.1) * period;
        model.y += model.velocity.y + Math.sin((tick + i) * 0.1) * period;

        // is it offscreen?
        if (model.x < -30) model.x += window.innerWidth;
        if (model.x > window.innerWidth) model.x = 0;

        if (model.y < -(ratios.orbSize / 2)) model.y += ratios.interfaceHeight;
        if (model.y > ratios.interfaceHeight) model.y = ratios.orbSize / 2;

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
      <Orb />
    </div>
  ));
};

OrbManager.displayName = "OrbManager";

// use memo to not re-render OrbManager unless its props change
export default memo(OrbManager);
