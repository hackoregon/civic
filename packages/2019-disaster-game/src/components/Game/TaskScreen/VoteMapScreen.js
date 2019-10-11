/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { BaseMap, IconMap } from "@hackoregon/component-library";
import { getTaskLocations } from "../../../state/tasks";

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
  taskLocations,
  taskVotes,
  mapTransitionDuration
}) => {
  const [longitude, setLongitude] = useState(initialLon);
  const [latitude, setLatitude] = useState(initialLat);
  const [data, setData] = useState(asGeoJSON(taskLocations));

  const getIcon = d => d.properties.id;

  // Returns a location that hasn't been completed if possible
  const getActiveTaskLocation = useCallback(
    currentTask => {
      let possibleTaskLocation = null;
      for (let i = 0; i < taskLocations.length; i += 1) {
        const taskAtLocation = taskLocations[i];
        if (taskAtLocation.type === currentTask.id) {
          if (taskAtLocation.completed) {
            possibleTaskLocation = taskAtLocation.location;
          } else {
            possibleTaskLocation = taskAtLocation.location;
            break;
          }
        }
      }
      return possibleTaskLocation;
    },
    [taskLocations]
  );

  useEffect(() => {
    setData(asGeoJSON(taskLocations));
  }, [taskLocations]);

  useEffect(() => {
    const saveYourselfMode = activeTaskId > 1;
    if (!saveYourselfMode) {
      if (activeTask) {
        const activeTaskLocation = getActiveTaskLocation(activeTask);
        setLatitude(activeTaskLocation[1]);
        setLongitude(activeTaskLocation[0]);
      } else {
        setLatitude(initialLat);
        setLongitude(initialLon);
      }
    }
  }, [activeTask, activeTaskId, getActiveTaskLocation]);

  // Would be cool to size these relative to each other in the future
  const sizeForVote = feature => {
    // Completed tasks always 20
    const isCompletedTaskLocation =
      feature && feature.properties && feature && feature.properties.completed;
    if (isCompletedTaskLocation) {
      return 20;
    }
    // OMSI location always 30
    const isOMSI =
      feature && feature.properties && feature.properties.type === "omsi";
    if (isOMSI) {
      return 30;
    }
    // Incomplete tasks
    const mapPropType =
      feature && feature.properties && feature.properties.type;
    const votesForTask = taskVotes[mapPropType] || 0;
    const mostVotesForAnyTask = taskVotes.mostVotesTotal || 1;
    const baseSize = 18;

    return baseSize + 2 * (4 * votesForTask - mostVotesForAnyTask);
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
          iconAtlas="https://i.imgur.com/899qI6L.png"
          iconMapping={poiIconMapping}
          iconSizeScale={poiIconZoomScale}
          getIcon={getIcon}
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
  taskLocations: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.arrayOf(PropTypes.number),
      type: PropTypes.string,
      completed: PropTypes.bool
    })
  ),
  taskVotes: PropTypes.shape({
    mostVotesId: PropTypes.string,
    mostVotesTotal: PropTypes.number,
    totalVotes: PropTypes.number
  }),
  mapTransitionDuration: PropTypes.number
};

const mapStateToProps = state => ({
  taskLocations: getTaskLocations(state)
});

export default connect(mapStateToProps)(VoteMapScreen);
