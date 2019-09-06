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
import cold from "../../assets/task_icons/cold.svg";
import dust from "../../assets/task_icons/dust.svg";
import fire from "../../assets/task_icons/fire.svg";
import hole from "../../assets/task_icons/hole.svg";
import hunger from "../../assets/task_icons/hunger.svg";
import injury from "../../assets/task_icons/injury.svg";
import lostPet from "../../assets/task_icons/lost-pet.svg";
import rubble from "../../assets/task_icons/rubble.svg";
import thirst from "../../assets/task_icons/thirst.svg";
import weather from "../../assets/task_icons/weather.svg";

// Save yourself ids
export const DUST = "dust";
export const RUBBLE = "rubble";
// Save others ids
export const COLD = "cold";
export const FIRE = "fire";
export const HUNGER = "hunger";
export const HOLE = "hole";
export const INJURY = "injury";
export const WEATHER = "weather";
export const LOST_PET = "lost-pet";
export const THIRST = "thirst";

// environments
export const URBAN = "urban";

export const tasks = {
  // Save Yourself
  [RUBBLE]: {
    id: RUBBLE,
    time: 15,
    requiredItem: protectiveGear,
    numberItemsToSolve: 3,
    points: 3,
    text: "I'm afraid I'll fall over the rubble.",
    imageSVG: rubble,
    imageAlt: "a rocky road",
    locations: [[-122.664628, 45.507309]]
  },
  [DUST]: {
    id: DUST,
    time: 15,
    requiredItem: dustMask,
    numberItemsToSolve: 1,
    points: 3,
    text: "It's so dusty!",
    imageSVG: dust,
    imageAlt: "a person coughing in the dust",
    locations: [[-122.648491, 45.51188]]
  },
  // Save Others
  [COLD]: {
    id: COLD,
    time: 20,
    requiredItem: blanket,
    numberItemsToSolve: 1,
    points: 3,
    text: "It's c-c-cold...",
    imageSVG: cold,
    imageAlt: "a shivering person",
    locations: [[-122.65819, 45.515699]]
  },
  [FIRE]: {
    id: FIRE,
    time: 30,
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
    time: 20,
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
    time: 20,
    requiredItem: rope,
    numberItemsToSolve: 1,
    points: 3,
    text: "Excuse me, sir. I seem to be stuck",
    imageSVG: hole,
    imageAlt: "a person reaching out of a hole",
    locations: [[-122.676215, 45.514166]]
  },
  [INJURY]: {
    id: INJURY,
    time: 30,
    requiredItem: firstAidKit,
    numberItemsToSolve: 5,
    points: 7,
    text: "That person looks hurt.",
    imageSVG: injury,
    imageAlt: "an injured person",
    locations: [[-122.678618, 45.52018]]
  },
  [WEATHER]: {
    id: WEATHER,
    time: 20,
    requiredItem: tent,
    numberItemsToSolve: 2,
    points: 4,
    text: "Ah! Rain!",
    imageSVG: weather,
    imageAlt: "a thunderstorm",
    locations: [[-122.655916, 45.526043]]
  },
  [LOST_PET]: {
    id: LOST_PET,
    time: 20,
    requiredItem: flashlight,
    numberItemsToSolve: 2,
    points: 4,
    text: "Where is my cat, Mr. Whiskers?",
    imageSVG: lostPet,
    imageAlt: "paw prints",
    locations: [[-122.667632, 45.523096]]
  },
  [THIRST]: {
    id: THIRST,
    time: 30,
    requiredItem: water,
    numberItemsToSolve: 5,
    points: 5,
    text: "Oh no! I'm so thirsty. Whatever will I do?",
    imageSVG: thirst,
    imageAlt: "a sweaty pineapple",
    locations: [[-122.681665, 45.530282]]
  }
};

export const tasksForEnvironment = {
  [URBAN]: {
    saveYourself: [RUBBLE, DUST],
    saveOthers: [FIRE, INJURY, HOLE, HUNGER]
  }
};
