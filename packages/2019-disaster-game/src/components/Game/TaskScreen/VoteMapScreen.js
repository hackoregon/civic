/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { BaseMap, IconMap } from "@hackoregon/component-library";

// import { getCompletedTasks } from "../../../state/tasks";
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

const VoteMapScreen = ({
  activeTask,
  activeTaskId,
  completedTasks = [],
  tasks,
  taskVotes,
  mapTransitionDuration
}) => {
  const [longitude, setLongitude] = useState(initialLon);
  const [latitude, setLatitude] = useState(initialLat);

  const data = asGeoJSON(tasks, activeTask, completedTasks);

  useEffect(() => {
    const saveYourselfMode = activeTaskId > 1;
    if (!saveYourselfMode) {
      if (activeTask) {
        setLatitude(activeTask.locations[0][1]);
        setLongitude(activeTask.locations[0][0]);
      } else {
        setLatitude(initialLat);
        setLongitude(initialLon);
      }
    }
  }, [activeTask, activeTaskId]);

  // Would be cool to size these relative to each other in the future
  const sizeForVote = feature => {
    const mapPropType =
      feature && feature.properties && feature.properties.type;

    const votesForTask = taskVotes[mapPropType] || 0;
    const mostVotesForAnyTask = taskVotes.mostVotesTotal || 1;
    const baseSize = 18;

    return baseSize + 2 * (2 * votesForTask - mostVotesForAnyTask);
  };

  return (
    <div css={screenLayout}>
      <BaseMap
        initialZoom={15}
        initialLongitude={longitude}
        initialLatitude={latitude}
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
        animationDuration={mapTransitionDuration * 1000}
        civicMapStyle="disaster-game"
      >
        <IconMap
          data={data}
          getPosition={getPosition}
          iconAtlas="https://i.imgur.com/3nUNo65.png"
          iconMapping={poiIconMapping}
          iconSizeScale={poiIconZoomScale}
          getIcon={d => d.properties.type}
          getSize={sizeForVote}
        />
      </BaseMap>
    </div>
  );
};

VoteMapScreen.propTypes = {
  activeTaskId: PropTypes.number,
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
  }),
  mapTransitionDuration: PropTypes.number
};

export default VoteMapScreen;

// const mapStateToProps = state => ({
// completedTasks: getCompletedTasks(state)
// });

// export default connect(mapStateToProps)(VoteMapScreen);
