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
    time: 15 * 1000,
    requiredItems: [protectiveGear],
    points: 3,
    text: "I'm afraid I'll fall over the rubble."
  },
  // Save Others
  [FIRE]: {
    id: FIRE,
    time: 20 * 1000, // seconds * milliseconds
    requiredItems: [fireExtinguisher],
    points: 5,
    text: "Uh oh! This fire could spread!"
  },
  [INJURY]: {
    id: INJURY,
    time: 20 * 1000, // seconds * milliseconds
    requiredItems: [firstAidKit],
    points: 7,
    text: "That person looks hurt."
  },
  [HUNGER]: {
    id: HUNGER,
    time: 20 * 1000, // seconds * milliseconds
    requiredItems: [food],
    points: 5,
    text: "So. Hungry."
  },
  [THIRST]: {
    id: THIRST,
    time: 20 * 1000, // seconds * milliseconds
    requiredItems: [water],
    points: 5,
    text: "Oh no! I'm so thirsty. Whatever will I do?"
  }
};

export const tasksForEnvironment = {
  [SUBURBAN]: {
    saveYourself: [PROTECTION, INJURY],
    saveOthers: [HUNGER, THIRST]
  },
  [URBAN]: {
    saveYourself: [PROTECTION, THIRST],
    saveOthers: [FIRE, INJURY]
  }
};
