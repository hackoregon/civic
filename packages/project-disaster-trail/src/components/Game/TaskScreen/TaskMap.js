import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { BaseMap, IconMap } from "@hackoregon/component-library";

import { getCompletedTasks } from "../../../state/tasks";
import TextContainer from "../../atoms/Containers/TextContainer";

const [lon, lat] = [-122.6655, 45.5081];
const getPosition = f => (f.geometry ? f.geometry.coordinates : [lon, lat]);

const FIXTURE_DATA = [
  {
    geometry: {
      coordinates: [-122.6658475, 45.5084872]
    },
    properties: {
      type: "BEECN"
    }
  }
];

const getIconColor = f => {
  const mapping = {
    BEECN: [238, 73, 92]
  };
  return mapping[f.properties.type] || [25, 183, 170];
};

const poiIconMapping = {
  School: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  Hospital: {
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
  "Fire Station": {
    x: 0,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  Pin: {
    x: 250,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  COMMCTR: {
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

const TaskMap = ({ completedTasks, animateMap }) => {
  return animateMap ? (
    <TextContainer>
      <h1>SUPER COOL MAP IS PANNING AND ZOOMING...</h1>
      <h3>Complete Tasks: [{completedTasks.join(", ")} ]</h3>
    </TextContainer>
  ) : (
    //   <h2>THIS IS A SUPER COOL MAP</h2>
    <BaseMap
      initialZoom={14}
      initialLatitude={lat}
      initialLongitude={lon}
      initialPitch={60}
      isInteractive={false}
      navigation={false}
      useContainerHeight
    >
      <IconMap
        data={FIXTURE_DATA}
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
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  animateMap: PropTypes.bool
};

const mapStateToProps = state => ({
  completedTasks: getCompletedTasks(state)
});

export default connect(mapStateToProps)(TaskMap);
