export const poiIconMapping = {
  cold: {
    x: 0,
    y: 0,
    width: 445 + 2,
    height: 445
  },
  dust: {
    x: 445 + 4,
    y: 0,
    width: 445,
    height: 445
  },
  fire: {
    x: 890 + 4,
    y: 0,
    width: 447,
    height: 445
  },
  hole: {
    x: 0,
    y: 445,
    width: 445 + 2,
    height: 445
  },
  hunger: {
    x: 445 + 2,
    y: 445,
    width: 445 + 2,
    height: 445
  },
  injury: {
    x: 890 + 4,
    y: 445,
    width: 445,
    height: 445
  },
  "lost-pet": {
    x: 0,
    y: 890,
    width: 445 + 2,
    height: 445
  },
  thirst: {
    x: 445 + 4,
    y: 890,
    width: 445,
    height: 445
  },
  weather: {
    x: 890 + 4,
    y: 890,
    width: 445 + 2,
    height: 445
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

export const asGeoJSON = (tasks, activeTask, completedTasks) =>
  tasks.reduce((features, task) => {
    const props = { ...task, isCompleted: completedTasks.includes(task.type) };
    if (task.type === activeTask.type) {
      props.isActive = true;
    }
    delete props.locations;
    const points = task.locations.map(location => ({
      geometry: {
        coordinates: location
      },
      properties: props
    }));
    return features.concat(points);
  }, []);
