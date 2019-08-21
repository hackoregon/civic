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
  return activeTask.requiredItem === currentOrb.type;
}

export function isIncorrectCompletedOrb(currentOrb, completedOrbs, activeTask) {
  return (
    activeTask.requiredItem !== currentOrb.type &&
    completedOrbs.includes(currentOrb.type)
  );
}

export function completedOrbHandler(
  completedOrbs,
  currentOrb,
  activeTask,
) {
  const orbCopy = currentOrb;
  if (isCorrectCompletedOrb(currentOrb, activeTask)) {
    orbCopy.y -= 1.0;
  }

  if (isIncorrectCompletedOrb(currentOrb, completedOrbs, activeTask)) {
    // currentOrb.y -= currentOrb.velocity.y + Math.sin((tick + index) * 0.1) * orbConfig.period;
  }
}

export function uncompletedOrbHandler(currentOrb, tick, index, orbConfig) {
  currentOrb.x += currentOrb.velocity.x; // + Math.cos(tick * 0.1) * period;
  currentOrb.y +=
    currentOrb.velocity.y + Math.sin((tick + index) * 0.1) * orbConfig.period;

  return currentOrb;
}
