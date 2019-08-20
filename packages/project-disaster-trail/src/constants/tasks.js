import {
  blanket,
  dustMask,
  fireExtinguisher,
  firstAidKit,
  flashlight,
  food,
  protectiveGear,
  rope,
  tent,
  water
} from "./items";
// Images
import fire from "../../assets/fire.svg";
import hunger from "../../assets/hunger.svg";
import injury from "../../assets/injury.png";
import rubble from "../../assets/rubble.svg";
import thirsty from "../../assets/thirsty.svg";

// Save yourself ids
export const PROTECT_BODY = "protect-body";
export const PROTECT_LUNGS = "protect-lungs";
// Save others ids
export const COLD = "cold";
export const FIRE = "fire";
export const HUNGER = "hunger";
export const HOLE = "hole";
export const INJURY = "injury";
export const RAIN = "rain";
export const RESCUE_PET = "rescue-pet";
export const THIRST = "thirst";

// environments
export const URBAN = "urban";

export const tasks = {
  // Save Yourself
  [PROTECT_BODY]: {
    id: PROTECT_BODY,
    time: 15 * 1000,
    requiredItem: protectiveGear,
    numberItemsToSolve: 3,
    points: 3,
    text: "I'm afraid I'll fall over the rubble.",
    imageSVG: rubble,
    imageAlt: "a rocky road",
    locations: [[-122.664628, 45.507309]]
  },
  [PROTECT_LUNGS]: {
    id: PROTECT_LUNGS,
    time: 15 * 1000,
    requiredItem: dustMask,
    numberItemsToSolve: 1,
    points: 3,
    text: "It's so dusty!",
    imageSVG: "https://image.flaticon.com/icons/svg/1054/1054873.svg",
    imageAlt: "juggling man",
    locations: [[-122.648491, 45.51188]]
  },
  // Save Others
  [COLD]: {
    id: COLD,
    time: 20 * 1000, // seconds * milliseconds
    requiredItem: blanket,
    numberItemsToSolve: 1,
    points: 3,
    text: "It's c-c-cold...",
    imageSVG: "https://image.flaticon.com/icons/svg/1054/1054873.svg",
    imageAlt: "juggling man",
    locations: [[-122.65819, 45.515699]]
  },
  [FIRE]: {
    id: FIRE,
    time: 20 * 1000, // seconds * milliseconds
    requiredItem: fireExtinguisher,
    numberItemsToSolve: 5,
    points: 5,
    text: "Uh oh! This fire could spread!",
    imageSVG: fire,
    imageAlt: "stuff on fire",
    locations: [[-122.656388, 45.516842]]
  },
  [HUNGER]: {
    id: HUNGER,
    time: 20 * 1000, // seconds * milliseconds
    requiredItem: food,
    numberItemsToSolve: 5,
    points: 5,
    text: "So. Hungry.",
    imageSVG: hunger,
    imageAlt: "a hungry person",
    locations: [[-122.651882, 45.514948]]
  },
  [HOLE]: {
    id: HOLE,
    time: 20 * 1000, // seconds * milliseconds
    requiredItem: rope,
    numberItemsToSolve: 1,
    points: 3,
    text: "Excuse me, sir. I seem to be stuck",
    imageSVG: "https://image.flaticon.com/icons/svg/1054/1054873.svg",
    imageAlt: "juggling man",
    locations: [[-122.676215, 45.514166]]
  },
  [INJURY]: {
    id: INJURY,
    time: 20 * 1000, // seconds * milliseconds
    requiredItem: firstAidKit,
    numberItemsToSolve: 5,
    points: 7,
    text: "That person looks hurt.",
    imageSVG: injury,
    imageAlt: "an injured person",
    locations: [[-122.678618, 45.52018]]
  },
  [RAIN]: {
    id: RAIN,
    time: 20 * 1000, // seconds * milliseconds
    requiredItem: tent,
    numberItemsToSolve: 2,
    points: 4,
    text: "Ah! Rain!",
    imageSVG: "https://image.flaticon.com/icons/svg/1054/1054873.svg",
    imageAlt: "juggling man",
    locations: [[-122.655916, 45.526043]]
  },
  [RESCUE_PET]: {
    id: RESCUE_PET,
    time: 20 * 1000, // seconds * milliseconds
    requiredItem: flashlight,
    numberItemsToSolve: 2,
    points: 4,
    text: "Where is my cat, Mr. Whiskers?",
    imageSVG: "https://image.flaticon.com/icons/svg/1054/1054873.svg",
    imageAlt: "juggling man",
    locations: [[-122.667632, 45.523096]]
  },
  [THIRST]: {
    id: THIRST,
    time: 20 * 1000, // seconds * milliseconds
    requiredItem: water,
    numberItemsToSolve: 5,
    points: 5,
    text: "Oh no! I'm so thirsty. Whatever will I do?",
    imageSVG: thirsty,
    imageAlt: "a sweaty pineapple",
    locations: [[-122.681665, 45.530282]]
  }
};

export const tasksForEnvironment = {
  [URBAN]: {
    saveYourself: [PROTECT_BODY, PROTECT_LUNGS],
    saveOthers: [FIRE, INJURY, HOLE, HUNGER]
  }
};
