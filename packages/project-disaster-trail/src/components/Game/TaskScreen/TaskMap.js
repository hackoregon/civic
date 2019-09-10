/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { BaseMap, IconMap } from "@hackoregon/component-library";

import { getCompletedTasks } from "../../../state/tasks";
import {
  poiIconMapping,
  poiIconZoomScale,
  getPosition,
  asGeoJSON,
  initialLon,
  initialLat
} from "./mapUtils";

const screenLayout = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: beige;
`;

const TaskMap = ({ activeTask, completedTasks, tasks, taskVotes }) => {
  // TODO: Change lon / lat for task
  // const lon = activeTask ? activeTask.locations[0][0] : initialLon;
  // const lat = activeTask ? activeTask.locations[0][1] : initialLat;
  const lon = initialLon;
  const lat = initialLat;

  const selectedTask = activeTask || tasks[0];
  const data = asGeoJSON(tasks, selectedTask, completedTasks);

  // Would be cool to size these relative to each other in the future
  const sizeForVote = dataThing => {
    const mapPropType =
      dataThing && dataThing.properties && dataThing.properties.type;

    const votesForTask = taskVotes[mapPropType] || 0;
    const mostVotesForAnyTask = taskVotes.mostVotesTotal || 1;
    const baseSize = 12;

    return baseSize + 2 * (votesForTask - mostVotesForAnyTask);
  };

  return (
    <div css={screenLayout}>
      <BaseMap
        initialZoom={15}
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
          getSize={sizeForVote}
        />
      </BaseMap>
    </div>
  );
};

TaskMap.propTypes = {
  activeTask: PropTypes.shape({
    task: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  }),
  completedTasks: PropTypes.arrayOf(PropTypes.string),
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskVotes: PropTypes.shape({
    mostVotesId: PropTypes.string,
    mostVotesTotal: PropTypes.number,
    totalVotes: PropTypes.number
  })
};

const mapStateToProps = state => ({
  completedTasks: getCompletedTasks(state)
});

export default connect(mapStateToProps)(TaskMap);
