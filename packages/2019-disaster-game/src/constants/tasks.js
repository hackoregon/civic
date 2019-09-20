import {
  blanket,
  dustMask,
  // fireExtinguisher,
  firstAidKit,
  flashlight,
  food,
  protectiveGear,
  rope,
  tent,
  water
} from "./items";

// Task icons
import cold from "../../assets/task_icons/cold.svg";
import dust from "../../assets/task_icons/dust.svg";
// import fire from "../../assets/task_icons/fire.svg";
import hole from "../../assets/task_icons/hole.svg";
import hunger from "../../assets/task_icons/hunger.svg";
import injury from "../../assets/task_icons/injury.svg";
import lostPet from "../../assets/task_icons/lost-pet.svg";
import rubble from "../../assets/task_icons/rubble.svg";
import thirst from "../../assets/task_icons/thirst.svg";
import weather from "../../assets/task_icons/weather.svg";

// Task scenes
import sceneCold from "../../assets/task_scenes/scene-cold.svg";
import sceneDust from "../../assets/task_scenes/scene-dust.svg";
// import sceneFire from "../../assets/task_scenes/scene-fire.svg";
import sceneHole from "../../assets/task_scenes/scene-hole.svg";
import sceneHunger from "../../assets/task_scenes/scene-hunger.svg";
import sceneInjury from "../../assets/task_scenes/scene-injury.svg";
import sceneLostPet from "../../assets/task_scenes/scene-lost-pet-2.svg";
import sceneRubble from "../../assets/task_scenes/scene-rubble.svg";
import sceneThirst from "../../assets/task_scenes/scene-thirst.svg";
import sceneWeather from "../../assets/task_scenes/scene-weather.svg";

// Save yourself ids
export const DUST = "dust";
export const RUBBLE = "rubble";
// Save others ids
export const COLD = "cold";
// export const FIRE = "fire";
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
    sceneSVG: sceneRubble,
    sceneAlt: "rubble in your way",
    locations: [[-122.6655, 45.5081]]
  },
  [DUST]: {
    id: DUST,
    time: 15,
    requiredItem: dustMask,
    numberItemsToSolve: 3,
    points: 3,
    text: "It's so dusty!",
    imageSVG: dust,
    imageAlt: "a person coughing in the dust",
    sceneSVG: sceneDust,
    sceneAlt: "a person coughing in the dust",
    locations: [[-122.676169, 45.516485]]
  },
  // Save Others
  [COLD]: {
    id: COLD,
    time: 15,
    requiredItem: blanket,
    numberItemsToSolve: 3,
    points: 3,
    text: "It's c-c-cold...",
    imageSVG: cold,
    imageAlt: "a shivering person",
    sceneSVG: sceneCold,
    sceneAlt: "a shivering person",
    locations: [[-122.610302, 45.504791], [-122.675011, 45.503044]]
  },
  // [FIRE]: {
  //   id: FIRE,
  //   time: 15,
  //   requiredItem: fireExtinguisher,
  //   numberItemsToSolve: 5,
  //   points: 5,
  //   text: "Uh oh! This fire could spread!",
  //   imageSVG: fire,
  //   imageAlt: "fire",
  //   sceneSVG: sceneFire,
  //   sceneAlt: "a fire that's spreading",
  //   locations: [[-122.615447, 45.514957], [-122.685672, 45.525356]]
  // },
  [HUNGER]: {
    id: HUNGER,
    time: 15,
    requiredItem: food,
    numberItemsToSolve: 5,
    points: 5,
    text: "So. Hungry.",
    imageSVG: hunger,
    imageAlt: "a hungry person",
    sceneSVG: sceneHunger,
    sceneAlt: "a hungry person",
    locations: [
      [-122.608228, 45.534321],
      [-122.638366, 45.498539],
      [-122.654591, 45.521335]
    ]
  },
  [HOLE]: {
    id: HOLE,
    time: 15,
    requiredItem: rope,
    numberItemsToSolve: 3,
    points: 3,
    text: "Excuse me, sir. I seem to be stuck",
    imageSVG: hole,
    imageAlt: "a person reaching out of a hole",
    sceneSVG: sceneHole,
    sceneAlt: "a person reaching out of a crack in the road",
    locations: [
      [-122.623602, 45.511711],
      [-122.672012, 45.521634],
      [-122.665401, 45.511649]
    ]
  },
  [INJURY]: {
    id: INJURY,
    time: 15,
    requiredItem: firstAidKit,
    numberItemsToSolve: 5,
    points: 7,
    text: "That person looks hurt.",
    imageSVG: injury,
    imageAlt: "an injured person",
    sceneSVG: sceneInjury,
    sceneAlt: "an injured person",
    locations: [[-122.678618, 45.52018]]
  },
  [WEATHER]: {
    id: WEATHER,
    time: 15,
    requiredItem: tent,
    numberItemsToSolve: 2,
    points: 4,
    text: "Ah! Rain!",
    imageSVG: weather,
    imageAlt: "a thunderstorm",
    sceneSVG: sceneWeather,
    sceneAlt: "a thunderstorm",
    locations: [[-122.651841, 45.496852], [-122.638194, 45.503651]]
  },
  [LOST_PET]: {
    id: LOST_PET,
    time: 15,
    requiredItem: flashlight,
    numberItemsToSolve: 2,
    points: 4,
    text: "Where is my cat, Mr. Whiskers?",
    imageSVG: lostPet,
    imageAlt: "paw prints",
    sceneSVG: sceneLostPet,
    sceneAlt: "a place the pet may be hiding",
    locations: [[-122.629352, 45.531557], [-122.651925, 45.507501]]
  },
  [THIRST]: {
    id: THIRST,
    time: 15,
    requiredItem: water,
    numberItemsToSolve: 5,
    points: 5,
    text: "Oh no! I'm so thirsty. Whatever will I do?",
    imageSVG: thirst,
    imageAlt: "a thirsty person",
    sceneSVG: sceneThirst,
    sceneAlt: "a thirsty person",
    locations: [[-122.634761, 45.515922]]
  }
};

export const tasksForEnvironment = {
  [URBAN]: {
    saveYourself: [RUBBLE, DUST],
    saveOthers: [INJURY, HOLE, HUNGER, COLD, WEATHER, LOST_PET, THIRST]
  }
};
