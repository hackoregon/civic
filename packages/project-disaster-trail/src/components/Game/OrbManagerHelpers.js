import { cloneDeep, sampleSize } from "lodash";

export function createRandomLayout(kitItems, bounds, config) {
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
      kitData.y = Math.random() * (bounds.height - config.orbSize * 2);
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

export function createFixedLayout(
  kitItems,
  bounds,
  config,
  totalGeneratedOrbs = 50,
  columnsInRow = 15
) {
  if (!kitItems.length) {
    return [];
  }

  // create an empty array.
  let orbCollection = [];

  for (let i = 0, orbCount = kitItems.length; i < orbCount; i += 1) {
    const kitData = kitItems[i];
    const jCount = totalGeneratedOrbs / orbCount;

    for (let j = 0; j < jCount; j += 1) {
      const orbId = `${kitData.type}-${j}`;
      kitData.x = 0;
      kitData.y = 0;
      kitData.velocity = {
        x: 0,
        y: 0
      };

      orbCollection.push(
        Object.assign({}, { orbId }, { touched: false }, kitData)
      );
    }
  }

  // rearranges the orbs so the layout appears random
  orbCollection = sampleSize(orbCollection, orbCollection.length);

  // build a staggered grid of 4 columns, then 3 in the next
  // if we have 11 items, rows will be 6 and columns will be 3
  const rows = Math.ceil(orbCollection.length / columnsInRow);
  const columnWidth =
    (bounds.width - config.verticalBuffer * 2 - config.orbSize / 2) /
    (columnsInRow - 1);
  const rowHeight = (bounds.height - config.verticalBuffer * 2) / rows;

  for (let i = 0; i < orbCollection.length; i += 1) {
    const orb = orbCollection[i];

    const rowIndex = Math.floor(i / columnsInRow);
    const columnIndex = i % columnsInRow;
    orb.x =
      config.verticalBuffer + columnIndex * columnWidth - config.orbSize / 2;
    orb.y = config.verticalBuffer + rowIndex * rowHeight - config.orbSize / 2;
    orb.delay = i * 0.05;

    orbCollection[i] = orb;
  }

  return orbCollection;
}

export function isCorrectCompletedOrb(currentOrb, activeTask) {
  return activeTask && activeTask.requiredItem === currentOrb.type;
}

export function isIncorrectCompletedOrb(currentOrb, activeTask) {
  return activeTask && activeTask.requiredItem !== currentOrb.type;
}

export function completedOrbHandler(
  currentOrb,
  activeTask,
  frozenOrbInterface
) {
  const orbCopy = cloneDeep(currentOrb);
  if (isCorrectCompletedOrb(orbCopy, activeTask) || frozenOrbInterface) {
    orbCopy.y -= 2.0;
  } else if (isIncorrectCompletedOrb(orbCopy, activeTask)) {
    orbCopy.y += 2.0;
  }

  return orbCopy;
}

export function uncompletedOrbHandler(
  currentOrb,
  tick,
  index,
  orbConfig,
  frozenOrbInterface
) {
  if (frozenOrbInterface) return currentOrb;
  const orbCopy = cloneDeep(currentOrb);

  orbCopy.x += orbCopy.velocity.x; // + Math.cos(tick * 0.1) * period;
  orbCopy.y +=
    orbCopy.velocity.y + Math.sin((tick + index) * 0.1) * orbConfig.period;

  return orbCopy;
}
