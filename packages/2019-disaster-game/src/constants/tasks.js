import { sample } from "lodash";

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

// Task icons
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

// Task scenes
import sceneCold from "../../assets/task_scenes/scene-cold.svg";
import sceneDust from "../../assets/task_scenes/scene-dust.svg";
import sceneFire from "../../assets/task_scenes/scene-fire.svg";
import sceneHole from "../../assets/task_scenes/scene-hole.svg";
import sceneHunger from "../../assets/task_scenes/scene-hunger.svg";
import sceneInjury from "../../assets/task_scenes/scene-injury.svg";
import sceneLostPet from "../../assets/task_scenes/scene-lost-pet-2.svg";
import sceneRubble from "../../assets/task_scenes/scene-rubble.svg";
import sceneThirst from "../../assets/task_scenes/scene-thirst.svg";
import sceneWeather from "../../assets/task_scenes/scene-weather.svg";

/* BOY VOICE AUDIO */
// Task instruction audio
import rubbleInstructionBoy from "../../assets/audio/task_screen/boy/rubble.mp3";
import dustInstructionBoy from "../../assets/audio/task_screen/boy/dust.mp3";
import hungerInstructionBoy from "../../assets/audio/task_screen/boy/hunger.mp3";
import holeInstructionBoy from "../../assets/audio/task_screen/boy/hole.mp3";
import coldInstructionBoy from "../../assets/audio/task_screen/boy/cold.mp3";
import lostPetInstructionBoy from "../../assets/audio/task_screen/boy/lost_pet.mp3";
import injuryInstructionBoy from "../../assets/audio/task_screen/boy/injury.mp3";
import fireInstructionBoy from "../../assets/audio/task_screen/boy/fire.mp3";

// Task question audio
import defaultQuestionBoy from "../../assets/audio/task_screen/boy/how_can_i_help.mp3";
import dustQuestionBoy from "../../assets/audio/task_screen/boy/question_dust.mp3";
import rubbleQuestionBoy from "../../assets/audio/task_screen/boy/question_rubble.mp3";
import coldQuestionBoy from "../../assets/audio/task_screen/boy/question_cold.mp3";

/* GIRL VOICE AUDIO */
// Task instruction audio
import dustInstructionGirl from "../../assets/audio/task_screen/girl/dust.mp3";
import hungerInstructionGirl from "../../assets/audio/task_screen/girl/hunger.mp3";
import thirstInstructionGirl from "../../assets/audio/task_screen/girl/thirst.mp3";

// Task question audio
import defaultQuestionGirl from "../../assets/audio/task_screen/girl/how_can_i_help.mp3";
import rubbleQuestionGirl from "../../assets/audio/task_screen/girl/rubble.mp3";

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
    audioInstruction: rubbleInstructionBoy,
    audioQuestion: sample([rubbleQuestionGirl, rubbleQuestionBoy]),
    requiredItem: protectiveGear,
    numberItemsToSolve: 3,
    // peopleSavedRange: [1, 1],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: rubble,
    imageAlt: "a rocky road",
    sceneSVG: sceneRubble,
    sceneAlt: "rubble in your way",
    clue: "There’s a lot of rubble and broken glass around here.",
    tickerTape:
      "Gloves, boots, and goggles can help prevent injury when there’s lots of debris.",
    locations: [[-122.6655, 45.5081]]
  },
  [DUST]: {
    id: DUST,
    time: 15,
    audioInstruction: sample([dustInstructionGirl, dustInstructionBoy]),
    audioQuestion: dustQuestionBoy,
    requiredItem: dustMask,
    numberItemsToSolve: 3,
    // peopleSavedRange: [1, 1],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: dust,
    imageAlt: "a person coughing in the dust",
    sceneSVG: sceneDust,
    sceneAlt: "a person coughing in the dust",
    clue: "It's getting hard to breathe here.",
    tickerTape:
      "Lots of debris will cause poor air quality after an earthquake.",
    locations: [[-122.676169, 45.516485]]
  },
  // Save Others
  [COLD]: {
    id: COLD,
    time: 15,
    audioInstruction: coldInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: blanket,
    numberItemsToSolve: 3,
    // peopleSavedRange: [1 - 5],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: cold,
    imageAlt: "a shivering person",
    sceneSVG: sceneCold,
    sceneAlt: "a shivering person",
    clue: "It's cold out here!",
    tickerTape: "Plan for all potential weather conditions!",
    locations: [[-122.610302, 45.504791], [-122.675011, 45.503044]]
  },
  [FIRE]: {
    id: FIRE,
    time: 15,
    audioInstruction: fireInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: fireExtinguisher,
    numberItemsToSolve: 5,
    // peopleSavedRange: [5, 40],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: fire,
    imageAlt: "fire",
    sceneSVG: sceneFire,
    sceneAlt: "a fire that's spreading",
    clue: "Fire! Fire!",
    tickerTape: "Keep fire extinguishers up-to-date and serviced annually!",
    locations: [[-122.615447, 45.514957], [-122.685672, 45.525356]]
  },
  [HUNGER]: {
    id: HUNGER,
    time: 15,
    audioInstruction: sample([hungerInstructionGirl, hungerInstructionBoy]),
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: food,
    numberItemsToSolve: 5,
    // peopleSavedRange: [5, 40],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.7,
    imageSVG: hunger,
    imageAlt: "a hungry person",
    sceneSVG: sceneHunger,
    sceneAlt: "a hungry person",
    clue: "I'm so hungry!",
    tickerTape: "Don't forget to pack comfort foods like coffee and chocolate!",
    locations: [
      [-122.608228, 45.534321],
      [-122.638366, 45.498539],
      [-122.654591, 45.521335]
    ]
  },
  [HOLE]: {
    id: HOLE,
    time: 15,
    audioInstruction: holeInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: rope,
    numberItemsToSolve: 3,
    // peopleSavedRange: [1, 6],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: hole,
    imageAlt: "a person reaching out of a hole",
    sceneSVG: sceneHole,
    sceneAlt: "a person reaching out of a crack in the road",
    clue: "Help! I can't get out!",
    tickerTape:
      "NET members are Portland volunteers trained in urban search & rescue.",
    locations: [
      [-122.623602, 45.511711],
      [-122.672012, 45.521634],
      [-122.665401, 45.511649]
    ]
  },
  [INJURY]: {
    id: INJURY,
    time: 15,
    audioInstruction: injuryInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: firstAidKit,
    numberItemsToSolve: 5,
    // peopleSavedRange: [1, 15],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.7,
    imageSVG: injury,
    imageAlt: "an injured person",
    sceneSVG: sceneInjury,
    sceneAlt: "an injured person",
    clue: "Ow!",
    tickerTape: "Disaster kits should contain first aid kits and medications.",
    locations: [[-122.678618, 45.52018]]
  },
  [WEATHER]: {
    id: WEATHER,
    time: 15,
    audioInstruction: coldInstructionBoy,
    audioQuestion: coldQuestionBoy,
    requiredItem: tent,
    numberItemsToSolve: 2,
    // peopleSavedRange: [2, 15],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: weather,
    imageAlt: "a thunderstorm",
    sceneSVG: sceneWeather,
    sceneAlt: "a thunderstorm",
    clue: "It's cold out here!",
    tickerTape: "Plan for all potential weather conditions!",
    locations: [[-122.651841, 45.496852], [-122.638194, 45.503651]]
  },
  [LOST_PET]: {
    id: LOST_PET,
    time: 15,
    audioInstruction: lostPetInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: flashlight,
    numberItemsToSolve: 2,
    // peopleSavedRange: [0, 0],
    // petsSaved: 1,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: lostPet,
    imageAlt: "paw prints",
    sceneSVG: sceneLostPet,
    sceneAlt: "a place the pet may be hiding",
    clue: "Help! I can't find my cat!",
    tickerTape: "Pack supplies for pets with your disaster kit.",
    locations: [[-122.629352, 45.531557], [-122.651925, 45.507501]]
  },
  [THIRST]: {
    id: THIRST,
    time: 15,
    audioInstruction: thirstInstructionGirl,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: water,
    numberItemsToSolve: 5,
    // peopleSavedRange: [5, 40],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.7,
    imageSVG: thirst,
    imageAlt: "a thirsty person",
    sceneSVG: sceneThirst,
    sceneAlt: "a thirsty person",
    clue: "I'm so thirsty!",
    tickerTape: "Kits should contain 1 gallon of water per person per day.",
    locations: [[-122.634761, 45.515922]]
  }
};

export const tasksForEnvironment = {
  [URBAN]: {
    saveYourself: [RUBBLE, DUST],
    saveOthers: [INJURY, HOLE, HUNGER, COLD, WEATHER, LOST_PET, THIRST, FIRE]
  }
};
