import {
  protectiveGear,
  fireExtinguisher,
  firstAidKit,
  food,
  water
} from "./items";

// Save yourself ids
const protection = "PROTECTION";
// Save others ids
const fire = "FIRE";
const injury = "INJURY";
const hunger = "HUNGER";
const thirst = "THIRST";

const tasks = {
  // Save Yourself
  protection: {
    id: protection,
    time: 10,
    requiredItems: [protectiveGear],
    points: 3,
    text: "I'm afraid I'll fall over the rubble."
  },
  // Save Others
  fire: {
    id: fire,
    time: 20,
    requiredItems: [fireExtinguisher],
    points: 5,
    text: "Uh oh! This fire could spread!"
  },
  injury: {
    id: injury,
    time: 20,
    requiredItems: [firstAidKit],
    points: 7,
    text: "That person looks hurt."
  },
  hunger: {
    id: hunger,
    time: 20,
    requiredItems: [food],
    points: 5,
    text: "That person looks hurt."
  },
  thirst: {
    id: thirst,
    time: 20,
    requiredItems: [water],
    points: 5,
    text: "That person looks hurt."
  }
};

const tasksForEnvironment = {
  suburban: {
    saveYourself: [protection],
    saveOthers: [hunger, thirst]
  },
  urban: {
    saveYourself: [protection],
    saveOthers: [fire, injury]
  }
};

export default {
  tasks,
  tasksForEnvironment
};
