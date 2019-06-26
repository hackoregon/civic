/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState, memo } from "react";
import { map } from "lodash";

import Orb from "./Orb";

const OrbManager = ({ count = 10 }) => {
  let tempModels = [];
  let tick = 0;
  // how big is the circle the orbs 'float' up and down in
  const period = 2;

  for (let i = 0, model; i < count; i++) {
    model = {};
    model.x = Math.random() * window.innerWidth;
    model.y = Math.random() * window.innerHeight;
    model.velocity = {
      x: (Math.random() - 2) * 10,
      y: 0 // (Math.random() - 1) * 10
    };

    tempModels.push(model);
  }

  const [models, setModels] = useState(tempModels);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      tempModels = [];
      for (let i = 0, model; i < count; i++) {
        model = models[i];
        model.x += model.velocity.x; // + Math.cos(tick * 0.1) * period;
        model.y += model.velocity.y + Math.sin((tick + i) * 0.1) * period;

        if (model.x < -30) model.x += window.innerWidth;
        if (model.x > window.innerWidth) model.x = 0;

        if (model.y < -30) model.y += window.innerHeight;
        if (model.y > window.innerHeight) model.y = 0;

        tempModels.push(model);
      }

      setModels(tempModels);

      // eslint-disable-next-line no-plusplus
      tick++;

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

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

export default memo(OrbManager);
