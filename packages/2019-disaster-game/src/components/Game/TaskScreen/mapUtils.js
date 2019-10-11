const iconSize = 445;

export const poiIconMapping = {
  // INCOMPLETE TASKS
  // Row 1 --> y: 0
  cold: {
    x: iconSize,
    y: 0,
    width: iconSize,
    height: iconSize
  },
  dust: {
    x: iconSize * 2,
    y: 0,
    width: iconSize,
    height: iconSize
  },
  fire: {
    x: iconSize * 3,
    y: 0,
    width: iconSize,
    height: iconSize
  },
  // Row 2 --> y: iconSize
  hole: {
    x: 0,
    y: iconSize,
    width: iconSize,
    height: iconSize
  },
  hunger: {
    x: iconSize,
    y: iconSize,
    width: iconSize,
    height: iconSize
  },
  injury: {
    x: iconSize * 2,
    y: iconSize,
    width: iconSize,
    height: iconSize
  },
  "lost-pet": {
    x: iconSize * 3,
    y: iconSize,
    width: iconSize,
    height: iconSize
  },
  // Row 3 --> y: iconSize * 2
  omsi: {
    x: 0,
    y: iconSize * 2,
    width: iconSize,
    height: iconSize
  },
  rubble: {
    x: iconSize,
    y: iconSize * 2,
    width: iconSize,
    height: iconSize
  },
  thirst: {
    x: iconSize * 2,
    y: iconSize * 2,
    width: iconSize,
    height: iconSize
  },
  weather: {
    x: iconSize * 3,
    y: iconSize * 2,
    width: iconSize,
    height: iconSize
  },
  // COMPLETE TASKS
  // Row 4 --> y: iconSize * 3
  "complete-cold": {
    x: 0,
    y: iconSize * 3,
    width: iconSize,
    height: iconSize
  },
  "complete-dust": {
    x: iconSize,
    y: iconSize * 3,
    width: iconSize,
    height: iconSize
  },
  "complete-fire": {
    x: iconSize * 2,
    y: iconSize * 3,
    width: iconSize,
    height: iconSize
  },
  "complete-hole": {
    x: 0,
    y: iconSize * 3,
    width: iconSize,
    height: iconSize
  },
  // Row 5 --> y: iconSize * 4
  "complete-hunger": {
    x: 0,
    y: iconSize * 4,
    width: iconSize,
    height: iconSize
  },
  "complete-injury": {
    x: iconSize,
    y: iconSize * 4,
    width: iconSize,
    height: iconSize
  },
  "complete-lost-pet": {
    x: iconSize * 2,
    y: iconSize * 4,
    width: iconSize,
    height: iconSize
  },
  "complete-rubble": {
    x: iconSize * 3,
    y: iconSize * 4,
    width: iconSize,
    height: iconSize
  },
  // Row 6 --> y: iconSize * 5
  "complete-thirst": {
    x: 0,
    y: iconSize * 5,
    width: iconSize,
    height: iconSize
  },
  "complete-weather": {
    x: iconSize,
    y: iconSize * 5,
    width: iconSize,
    height: iconSize
  }
};

export const poiIconZoomScale = zoom => {
  const sizes = [[0, 1], [7.5, 2], [8.5, 4], [9.5, 6], [10.5, 8], [11.5, 10]];

  let size = 0;
  for (let i = 0; i < sizes.length; i += 1) {
    if (sizes[i][0] > zoom) break;
    [, size] = sizes[i];
  }
  return size;
};

const centralLonLat = [-122.644588, 45.508415];

export const [initialLon, initialLat] = centralLonLat;

export const getPosition = f =>
  f.geometry ? f.geometry.coordinates : [initialLon, initialLat];

export const asGeoJSON = tasksByLocation =>
  tasksByLocation.reduce((features, taskAtLocation) => {
    const props = {
      ...taskAtLocation,
      type: taskAtLocation.type,
      id: `${taskAtLocation.completed ? "complete-" : ""}${taskAtLocation.type}`
    };
    delete props.location;
    const points = {
      geometry: {
        coordinates: taskAtLocation.location
      },
      properties: props
    };
    return features.concat(points);
  }, []);
