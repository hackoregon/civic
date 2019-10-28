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

export const hardcodedTaskLocations = [
  // OMSI location
  {
    location: [-122.6655, 45.5081],
    type: "omsi",
    completed: false
  },
  // Tasks by location
  {
    location: [-122.665401, 45.511649],
    type: RUBBLE,
    completed: false
  },
  {
    location: [-122.662176, 45.508898],
    type: DUST,
    completed: false
  },
  {
    location: [-122.610302, 45.504791],
    type: COLD,
    completed: false
  },
  {
    location: [-122.675011, 45.503044],
    type: COLD,
    completed: false
  },
  {
    location: [-122.615447, 45.514957],
    type: FIRE,
    completed: false
  },
  {
    location: [-122.685672, 45.525356],
    type: FIRE,
    completed: false
  },
  {
    location: [-122.608228, 45.514321],
    type: HUNGER,
    completed: false
  },
  {
    location: [-122.638366, 45.498539],
    type: HUNGER,
    completed: false
  },
  {
    location: [-122.654591, 45.521335],
    type: HUNGER,
    completed: false
  },
  {
    location: [-122.662656, 45.503654],
    type: HOLE,
    completed: false
  },
  {
    location: [-122.623602, 45.511711],
    type: HOLE,
    completed: false
  },
  {
    location: [-122.672012, 45.521634],
    type: HOLE,
    completed: false
  },
  {
    location: [-122.678618, 45.52018],
    type: INJURY,
    completed: false
  },
  {
    location: [-122.651841, 45.496852],
    type: WEATHER,
    completed: false
  },
  {
    location: [-122.638194, 45.503651],
    type: WEATHER,
    completed: false
  },
  {
    location: [-122.629352, 45.521557],
    type: LOST_PET,
    completed: false
  },
  {
    location: [-122.651925, 45.507501],
    type: LOST_PET,
    completed: false
  },
  {
    location: [-122.634761, 45.515922],
    type: THIRST,
    completed: false
  }
];

export const tasks = {
  // Save Yourself
  [RUBBLE]: {
    id: RUBBLE,
    time: 20,
    audioInstruction: rubbleInstructionBoy,
    audioQuestion: sample([rubbleQuestionGirl, rubbleQuestionBoy]),
    requiredItem: protectiveGear,
    numberItemsToSolve: 3,
    peopleSavedRange: [1, 3],
    petsSaved: 0,
    imageSVG: rubble,
    imageAlt: "a rocky road",
    sceneSVG: sceneRubble,
    sceneAlt: "rubble in your way",
    clue: "There’s a lot of rubble and broken glass around here.",
    tickerTape:
      "Gloves, boots, and goggles can help prevent injury when there’s lots of debris."
  },
  [DUST]: {
    id: DUST,
    time: 20,
    audioInstruction: sample([dustInstructionGirl, dustInstructionBoy]),
    audioQuestion: dustQuestionBoy,
    requiredItem: dustMask,
    numberItemsToSolve: 3,
    peopleSavedRange: [1, 3],
    petsSaved: 0,
    imageSVG: dust,
    imageAlt: "a person coughing in the dust",
    sceneSVG: sceneDust,
    sceneAlt: "a person coughing in the dust",
    clue: "It's getting hard to breathe here.",
    tickerTape:
      "Lots of debris will cause poor air quality after an earthquake."
  },
  // Save Others
  [COLD]: {
    id: COLD,
    time: 20,
    audioInstruction: coldInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: blanket,
    numberItemsToSolve: 3,
    peopleSavedRange: [1, 3],
    petsSaved: 0,
    imageSVG: cold,
    imageAlt: "a shivering person",
    sceneSVG: sceneCold,
    sceneAlt: "a shivering person",
    clue: "It's cold out here!",
    tickerTape: "Plan for all potential weather conditions!"
  },
  [FIRE]: {
    id: FIRE,
    time: 20,
    audioInstruction: fireInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: fireExtinguisher,
    numberItemsToSolve: 5,
    peopleSavedRange: [5, 15],
    petsSaved: 3,
    imageSVG: fire,
    imageAlt: "fire",
    sceneSVG: sceneFire,
    sceneAlt: "a fire that's spreading",
    clue: "Fire! Fire!",
    tickerTape: "Keep fire extinguishers up-to-date and serviced annually!"
  },
  [HUNGER]: {
    id: HUNGER,
    time: 20,
    audioInstruction: sample([hungerInstructionGirl, hungerInstructionBoy]),
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: food,
    numberItemsToSolve: 5,
    peopleSavedRange: [1, 5],
    petsSaved: 1,
    imageSVG: hunger,
    imageAlt: "a hungry person",
    sceneSVG: sceneHunger,
    sceneAlt: "a hungry person",
    clue: "I'm so hungry!",
    tickerTape: "Don't forget to pack comfort foods like coffee and chocolate!"
  },
  [HOLE]: {
    id: HOLE,
    time: 20,
    audioInstruction: holeInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: rope,
    numberItemsToSolve: 3,
    peopleSavedRange: [1, 1],
    petsSaved: 0,
    imageSVG: hole,
    imageAlt: "a person reaching out of a hole",
    sceneSVG: sceneHole,
    sceneAlt: "a person reaching out of a crack in the road",
    clue: "Help! I can't get out!",
    tickerTape:
      "NET members are Portland volunteers trained in urban search & rescue."
  },
  [INJURY]: {
    id: INJURY,
    time: 20,
    audioInstruction: injuryInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: firstAidKit,
    numberItemsToSolve: 5,
    peopleSavedRange: [1, 5],
    petsSaved: 0,
    imageSVG: injury,
    imageAlt: "an injured person",
    sceneSVG: sceneInjury,
    sceneAlt: "an injured person",
    clue: "Ow!",
    tickerTape: "Disaster kits should contain first aid kits and medications."
  },
  [WEATHER]: {
    id: WEATHER,
    time: 20,
    audioInstruction: coldInstructionBoy,
    audioQuestion: coldQuestionBoy,
    requiredItem: tent,
    numberItemsToSolve: 2,
    peopleSavedRange: [1, 3],
    petsSaved: 0,
    imageSVG: weather,
    imageAlt: "a thunderstorm",
    sceneSVG: sceneWeather,
    sceneAlt: "a thunderstorm",
    clue: "It's cold out here!",
    tickerTape: "Plan for all potential weather conditions!"
  },
  [LOST_PET]: {
    id: LOST_PET,
    time: 20,
    audioInstruction: lostPetInstructionBoy,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: flashlight,
    numberItemsToSolve: 2,
    peopleSavedRange: [0, 0],
    petsSaved: 1,
    imageSVG: lostPet,
    imageAlt: "paw prints",
    sceneSVG: sceneLostPet,
    sceneAlt: "a place the pet may be hiding",
    clue: "Help! I can't find my cat!",
    tickerTape: "Pack supplies for pets with your disaster kit."
  },
  [THIRST]: {
    id: THIRST,
    time: 20,
    audioInstruction: thirstInstructionGirl,
    audioQuestion: sample([defaultQuestionGirl, defaultQuestionBoy]),
    requiredItem: water,
    numberItemsToSolve: 5,
    peopleSavedRange: [1, 5],
    petsSaved: 1,
    imageSVG: thirst,
    imageAlt: "a thirsty person",
    sceneSVG: sceneThirst,
    sceneAlt: "a thirsty person",
    clue: "I'm so thirsty!",
    tickerTape: "Kits should contain 1 gallon of water per person per day."
  }
};

export const tasksForEnvironment = {
  [URBAN]: {
    saveYourself: [RUBBLE, DUST],
    saveOthers: [INJURY, HOLE, HUNGER, COLD, WEATHER, LOST_PET, THIRST, FIRE]
  }
};
