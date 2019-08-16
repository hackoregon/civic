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
    time: 5 * 1000,
    requiredItem: protectiveGear,
    numberItemsToSolve: 5,
    points: 3,
    text: "I'm afraid I'll fall over the rubble.",
    imageSVG: rubble,
    imageAlt: "a rocky road",
    locations: [[-122.664628, 45.507309], [-122.648491, 45.51188]]
  },
  // Save Others
  [FIRE]: {
    id: FIRE,
    time: 5 * 1000, // seconds * milliseconds
    requiredItem: fireExtinguisher,
    numberItemsToSolve: 5,
    points: 5,
    text: "Uh oh! This fire could spread!",
    imageSVG: fire,
    imageAlt: "stuff on fire",
    locations: [
      [-122.65819, 45.515699],
      [-122.656388, 45.516842],
      [-122.651882, 45.514948],
      [-122.676215, 45.514166]
    ]
  },
  [INJURY]: {
    id: INJURY,
    time: 5 * 1000, // seconds * milliseconds
    requiredItem: firstAidKit,
    numberItemsToSolve: 5,
    points: 7,
    text: "That person looks hurt.",
    imageSVG: injury,
    imageAlt: "an injured person",
    locations: [[-122.678618, 45.52018], [-122.655916, 45.526043]]
  },
  [HUNGER]: {
    id: HUNGER,
    time: 5 * 1000, // seconds * milliseconds
    requiredItem: food,
    numberItemsToSolve: 5,
    points: 5,
    text: "So. Hungry.",
    imageSVG: hunger,
    imageAlt: "a hungry person",
    locations: [
      [-122.667632, 45.523096],
      [-122.681665, 45.530282],
      [-122.663426, 45.515429],
      [-122.663168, 45.519849]
    ]
  },
  [THIRST]: {
    id: THIRST,
    time: 5 * 1000, // seconds * milliseconds
    requiredItem: water,
    numberItemsToSolve: 5,
    points: 5,
    text: "Oh no! I'm so thirsty. Whatever will I do?",
    imageSVG: thirsty,
    imageAlt: "a sweaty person",
    locations: [
      [-122.655229, 45.508422],
      [-122.640638, 45.528929],
      [-122.646131, 45.521713],
      [-122.646045, 45.52039],
      [-122.641453, 45.515248]
    ]
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
