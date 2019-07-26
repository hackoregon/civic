import {
  protectiveGear,
  fireExtinguisher,
  firstAidKit,
  food,
  water
} from "./items";

// Save yourself ids
export const PROTECTION = "protection";
// Save others ids
export const FIRE = "fire";
export const INJURY = "injury";
export const HUNGER = "hunger";
export const THIRST = "thirst";

// environments
export const URBAN = "urban";
export const SUBURBAN = "suburban";

export const tasks = {
  // Save Yourself
  [PROTECTION]: {
    id: PROTECTION,
    time: 10,
    requiredItems: [protectiveGear],
    points: 3,
    text: "I'm afraid I'll fall over the rubble."
  },
  // Save Others
  [FIRE]: {
    id: FIRE,
    time: 20,
    requiredItems: [fireExtinguisher],
    points: 5,
    text: "Uh oh! This fire could spread!"
  },
  [INJURY]: {
    id: INJURY,
    time: 20,
    requiredItems: [firstAidKit],
    points: 7,
    text: "That person looks hurt."
  },
  [HUNGER]: {
    id: HUNGER,
    time: 20,
    requiredItems: [food],
    points: 5,
    text: "That person looks hurt."
  },
  [THIRST]: {
    id: THIRST,
    time: 20,
    requiredItems: [water],
    points: 5,
    text: "That person looks hurt."
  }
};

export const tasksForEnvironment = {
  [SUBURBAN]: {
    saveYourself: [PROTECTION],
    saveOthers: [HUNGER, THIRST]
  },
  [URBAN]: {
    saveYourself: [PROTECTION],
    saveOthers: [FIRE, INJURY]
  }
};
