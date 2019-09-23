/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, useCallback, memo } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import Timer from "../../../utils/timer";
import { goToNextChapter } from "../../../state/chapters";
import {
  getTaskPhase,
  getActiveTaskData,
  getActiveTaskIndex,
  getWeightedTasks,
  goToNextTaskPhase,
  getActiveEnvironment,
  getTasksForEnvironment,
  addTask
} from "../../../state/tasks";
import { SOLVING, VOTING } from "../../../constants/actions";
import { chooseRandomTask } from "./voteUtils";

import SolveScreen from "./SolveScreen";
import VoteMapScreen from "./VoteMapScreen";

const chapterDuration = 300;
const votingDuration = 10;
const taskVotesDefault = {
  mostVotesId: null,
  mostVotesTotal: 0,
  totalVotes: 0
};

const TaskScreen = ({
  endChapter,
  activeTask,
  activeTaskIndex,
  weightedTasks,
  taskPhase,
  goToNextPhase,
  tasksForEnvironment,
  activeEnvironment,
  addNextTask
}) => {
  const [chapterTimer] = useState(new Timer());
  const [phaseTimer] = useState(new Timer());
  const [taskVotes, setTaskVotes] = useState(taskVotesDefault);

  const goToTask = useCallback(() => {
    const mostVotes = taskVotes.mostVotesTotal;
    let { mostVotesId } = taskVotes;
    if (mostVotes < 1) {
      mostVotesId = chooseRandomTask(tasksForEnvironment, activeEnvironment);
    }
    addNextTask(mostVotesId);
  }, [taskVotes, chooseRandomTask, tasksForEnvironment, activeEnvironment, addNextTask]);

  const startTimer = useCallback((duration, callback, completeTask) => {
    phaseTimer.reset();
    phaseTimer.setDuration(duration);
    phaseTimer.addCompleteCallback(() => {
      if (callback) {
        callback();
      }
      goToNextPhase(completeTask);
    });
    phaseTimer.start();
  }, [phaseTimer, goToNextPhase]);

  // Timer: chapter duration
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterTimer, endChapter]);

  // Timer: game phase
  useEffect(() => {
    if (taskPhase === SOLVING) startTimer(activeTask.time, null, true);
    if (taskPhase === VOTING) startTimer(votingDuration, goToTask);

    return () => {
      phaseTimer.stop();
    };
  }, [activeTask, goToTask, phaseTimer, startTimer, taskPhase]);

  // Timer: trigger timer when switching between tasks, not gameplay phases
  useEffect(() => {
    if (taskPhase === SOLVING && activeTaskIndex === 1) {
      startTimer(activeTask.time, null, true);
    }

    return () => {
      phaseTimer.stop();
    };
  }, [activeTask, activeTaskIndex, phaseTimer, startTimer, taskPhase]);

  return (
    <div
      css={css`
        position: relative;
        height: 100%;
      `}
    >
      <SolveScreen
        open={taskPhase === SOLVING}
        activeTask={activeTask}
        activeTaskIndex={activeTaskIndex}
      />
      <VoteMapScreen
        activeTask={activeTask}
        activeTaskIndex={activeTaskIndex}
        tasks={weightedTasks}
      />
    </div>
  );
};

TaskScreen.propTypes = {
  taskPhase: PropTypes.oneOf([
    SOLVING,
    VOTING
  ]),
  activeTask: PropTypes.shape({}),
  activeTaskIndex: PropTypes.number,
  endChapter: PropTypes.func,
  goToNextPhase: PropTypes.func,
  addNextTask: PropTypes.func,
  weightedTasks: PropTypes.arrayOf(PropTypes.shape({})),
  activeEnvironment: PropTypes.string,
  tasksForEnvironment: PropTypes.shape({})
};

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state),
  activeTask: getActiveTaskData(state),
  activeTaskIndex: getActiveTaskIndex(state),
  weightedTasks: getWeightedTasks(state),
  activeEnvironment: getActiveEnvironment(state),
  tasksForEnvironment: getTasksForEnvironment(state)
});

const mapDispatchToProps = dispatch => ({
  endChapter() {
    dispatch(goToNextChapter());
  },
  goToNextPhase(completeTask) {
    dispatch(goToNextTaskPhase(completeTask));
  },
  addNextTask(taskChoice) {
    dispatch(addTask(taskChoice));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TaskScreen));
