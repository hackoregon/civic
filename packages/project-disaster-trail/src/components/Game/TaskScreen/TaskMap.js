import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { BaseMap, IconMap } from "@hackoregon/component-library";

import { getCompletedTasks } from "../../../state/tasks";

const [omsiLon, omsiLat] = [-122.6655, 45.5081];
const getPosition = f =>
  f.geometry ? f.geometry.coordinates : [omsiLon, omsiLat];

const poiIconMapping = {
  cold: {
    x: 0,
    y: 0,
    width: 445,
    height: 445
  },
  dust: {
    x: 445,
    y: 0,
    width: 445,
    height: 445
  },
  fire: {
    x: 890,
    y: 0,
    width: 445,
    height: 445
  },
  hole: {
    x: 0,
    y: 445,
    width: 445,
    height: 445
  },
  hunger: {
    x: 445,
    y: 445,
    width: 445,
    height: 445
  },
  injury: {
    x: 890,
    y: 445,
    width: 445,
    height: 445
  },
  "lost-pet": {
    x: 0,
    y: 890,
    width: 445,
    height: 445
  },
  thirst: {
    x: 445,
    y: 890,
    width: 445,
    height: 445
  },
  weather: {
    x: 890,
    y: 890,
    width: 445,
    height: 445
  }
};

const poiIconZoomScale = zoom => {
  const sizes = [[0, 1], [7.5, 2], [8.5, 4], [9.5, 6], [10.5, 8], [11.5, 10]];

  let size = 0;
  for (let i = 0; i < sizes.length; i += 1) {
    if (sizes[i][0] > zoom) break;
    [, size] = sizes[i];
  }
  return size;
};

const asGeoJSON = (tasks, activeTask, completedTasks) =>
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

const TaskMap = ({ activeTask, completedTasks, tasks }) => {
  // TODO: This just takes the first location and that's no good
  const lon = activeTask ? activeTask.locations[0][0] : omsiLon;
  const lat = activeTask ? activeTask.locations[0][1] : omsiLat;

  const data = asGeoJSON(tasks, activeTask, completedTasks);

  return (
    <BaseMap
      initialZoom={14}
      initialLongitude={lon}
      initialLatitude={lat}
      initialPitch={60}
      navigation={false}
      useContainerHeight
      mapGLOptions={{
        scrollZoom: false,
        dragPan: false,
        dragRotate: false,
        doubleClickZoom: false,
        touchZoom: false,
        touchRotate: false,
        keyboard: false
      }}
      animate
      civicMapStyle="disaster-game"
    >
      <IconMap
        data={data}
        getPosition={getPosition}
        iconAtlas="https://i.imgur.com/ZKYqCqW.png"
        iconMapping={poiIconMapping}
        iconSizeScale={poiIconZoomScale}
        getIcon={d => d.properties.type}
        getSize={() => 7}
      />
    </BaseMap>
  );
};

TaskMap.propTypes = {
  activeTask: PropTypes.shape({
    task: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  }),
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  tasks: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  completedTasks: getCompletedTasks(state)
});

export default connect(mapStateToProps)(TaskMap);
