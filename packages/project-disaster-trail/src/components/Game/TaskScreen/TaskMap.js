import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { BaseMap, IconMap } from "@hackoregon/component-library";

import { getCompletedTasks } from "../../../state/tasks";

const [omsiLon, omsiLat] = [-122.6655, 45.5081];
const getPosition = f =>
  f.geometry ? f.geometry.coordinates : [omsiLon, omsiLat];

const getIconColor = f => {
  const mapping = {
    BEECN: [238, 73, 92],
    fire: [238, 73, 92],
    injury: [238, 73, 92],
    hunger: [238, 73, 92],
    thirst: [238, 73, 92],
    protection: [238, 73, 92]
  };
  return mapping[f.properties.type] || [25, 183, 170];
};

// This is a hacked together example mapping using last year's icon map
// but with this year's task IDs.
const poiIconMapping = {
  fire: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  injury: {
    x: 250,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  BEECN: {
    x: 500,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  hunger: {
    x: 0,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  thirst: {
    x: 250,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  protection: {
    x: 500,
    y: 250,
    width: 250,
    height: 250,
    mask: true
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
        iconAtlas="https://i.imgur.com/xgTAROe.png"
        iconMapping={poiIconMapping}
        iconSizeScale={poiIconZoomScale}
        getIcon={d => d.properties.type}
        getSize={() => 7}
        getColor={getIconColor}
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
