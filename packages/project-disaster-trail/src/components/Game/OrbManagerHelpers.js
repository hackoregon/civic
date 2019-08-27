import { cloneDeep } from "lodash";

export function createOrbsFromKit(kitItems, bounds, config) {
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

export function isCorrectCompletedOrb(currentOrb, activeTask) {
  return activeTask && activeTask.requiredItem === currentOrb.type;
}

export function isIncorrectCompletedOrb(currentOrb, activeTask) {
  return activeTask && activeTask.requiredItem !== currentOrb.type;
}

export function completedOrbHandler(currentOrb, activeTask) {
  const orbCopy = cloneDeep(currentOrb);
  if (isCorrectCompletedOrb(orbCopy, activeTask)) {
    orbCopy.y -= 2.0;
  }

  if (isIncorrectCompletedOrb(orbCopy, activeTask)) {
    orbCopy.y += 2.0;
  }

  return orbCopy;
}

export function uncompletedOrbHandler(currentOrb, tick, index, orbConfig) {
  const orbCopy = cloneDeep(currentOrb);

  orbCopy.x += orbCopy.velocity.x; // + Math.cos(tick * 0.1) * period;
  orbCopy.y +=
    orbCopy.velocity.y + Math.sin((tick + index) * 0.1) * orbConfig.period;

  return orbCopy;
}
