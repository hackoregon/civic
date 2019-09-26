export const getPossibleTasks = (tasksForEnvironment, activeEnvironment) => {
  // All possible tasks for the game environment
  const saveYourselfTasks = tasksForEnvironment[activeEnvironment].saveYourself;
  const saveOthersTasks = tasksForEnvironment[activeEnvironment].saveOthers;
  return [].concat(saveYourselfTasks, saveOthersTasks);
};

export const chooseRandomTask = (tasksForEnvironment, activeEnvironment) => {
  const possibleTasks = getPossibleTasks(
    tasksForEnvironment,
    activeEnvironment
  );
  const randomIndex = Math.floor(Math.random() * possibleTasks.length);
  const randomTask = possibleTasks[randomIndex];
  return randomTask;
};
