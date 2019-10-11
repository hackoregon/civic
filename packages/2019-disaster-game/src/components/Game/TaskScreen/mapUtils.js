const iconSize = 445;

export const poiIconMapping = {
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

export const [initialLon, initialLat] = [-122.644588, 45.508415];

export const getPosition = f =>
  f.geometry ? f.geometry.coordinates : [initialLon, initialLat];

export const asGeoJSON = tasks =>
  tasks.reduce((features, task) => {
    const props = { ...task };
    delete props.locations;
    const points = task.locations.map(location => ({
      geometry: {
        coordinates: location
      },
      properties: props
    }));
    return features.concat(points);
  }, []);
