import {
  protectiveGear,
  fireExtinguisher,
  firstAidKit,
  food,
  water
} from "./items";
// Images
import fire from "../../assets/fire.svg";
import hunger from "../../assets/hunger.svg";
import injury from "../../assets/injury.png";
import rubble from "../../assets/rubble.svg";
import thirsty from "../../assets/thirsty.svg";

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
    text: "I'm afraid I'll fall over the rubble.",
    imageSVG: rubble,
    imageAlt: "a rocky road"
  },
  // Save Others
  [FIRE]: {
    id: FIRE,
    time: 20 * 1000, // seconds * milliseconds
    requiredItems: [fireExtinguisher],
    points: 5,
    text: "Uh oh! This fire could spread!",
    imageSVG: fire,
    imageAlt: "stuff on fire"
  },
  [INJURY]: {
    id: INJURY,
    time: 20 * 1000, // seconds * milliseconds
    requiredItems: [firstAidKit],
    points: 7,
    text: "That person looks hurt.",
    imageSVG: injury,
    imageAlt: "an injured person"
  },
  [HUNGER]: {
    id: HUNGER,
    time: 20 * 1000, // seconds * milliseconds
    requiredItems: [food],
    points: 5,
    text: "So. Hungry.",
    imageSVG: hunger,
    imageAlt: "a hungry person"
  },
  [THIRST]: {
    id: THIRST,
    time: 20 * 1000, // seconds * milliseconds
    requiredItems: [water],
    points: 5,
    text: "Oh no! I'm so thirsty. Whatever will I do?",
    imageSVG: thirsty,
    imageAlt: "a sweaty person"
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
