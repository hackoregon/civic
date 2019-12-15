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
import { TYPES as SFX_TYPES } from "./sfx";

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
    time: 30,
    audioInstruction: SFX_TYPES.rubbleInstructionBoy,
    audioQuestion: sample([
      SFX_TYPES.rubbleQuestionGirl,
      SFX_TYPES.rubbleQuestionBoy
    ]),
    requiredItem: protectiveGear,
    numberItemsToSolve: 3,
    numberCorrectChosen: 0,
    peopleSavedRange: [1, 3],
    petsSaved: 0,
    imageSVG: rubble,
    imageAlt: "a rocky road",
    imageLabel: "People in Rubble",
    callToAction: "Let's help people around this rubble.",
    sceneSVG: sceneRubble,
    sceneAlt: "rubble in your way",
    clue: "There’s a lot of rubble and broken glass around here.",
    saveYourselfClue: "How can my friends and I get over this rubble safely?",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  [DUST]: {
    id: DUST,
    time: 30,
    audioInstruction: sample([
      SFX_TYPES.dustInstructionGirl,
      SFX_TYPES.dustInstructionBoy
    ]),
    audioQuestion: SFX_TYPES.dustQuestionBoy,
    requiredItem: dustMask,
    numberItemsToSolve: 3,
    numberCorrectChosen: 0,
    peopleSavedRange: [1, 1],
    petsSaved: 0,
    imageSVG: dust,
    imageAlt: "a person coughing in the dust",
    imageLabel: "Unsafe Air",
    callToAction: "Let's help those people coughing from the dust.",
    sceneSVG: sceneDust,
    sceneAlt: "a person coughing in the dust",
    clue: "It's getting hard to breathe here.",
    saveYourselfClue:
      "There's lots of dust! What will help my friends and I breathe cleaner air?",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  // Save Others
  [COLD]: {
    id: COLD,
    time: 20,
    audioInstruction: SFX_TYPES.coldInstructionBoy,
    audioQuestion: sample([
      SFX_TYPES.defaultQuestionGirl,
      SFX_TYPES.defaultQuestionBoy
    ]),
    requiredItem: blanket,
    numberItemsToSolve: 3,
    numberCorrectChosen: 0,
    peopleSavedRange: [1, 3],
    petsSaved: 0,
    imageSVG: cold,
    imageAlt: "a shivering person",
    imageLabel: "Cold People",
    callToAction: "Let's help those cold people.",
    sceneSVG: sceneCold,
    sceneAlt: "a shivering person",
    clue: "It's cold out here!",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  [FIRE]: {
    id: FIRE,
    time: 20,
    audioInstruction: SFX_TYPES.fireInstructionBoy,
    audioQuestion: sample([
      SFX_TYPES.defaultQuestionGirl,
      SFX_TYPES.defaultQuestionBoy
    ]),
    requiredItem: fireExtinguisher,
    numberItemsToSolve: 5,
    numberCorrectChosen: 0,
    peopleSavedRange: [5, 15],
    petsSaved: 3,
    imageSVG: fire,
    imageAlt: "fire",
    imageLabel: "House on Fire",
    callToAction: "Let's help put out that fire!",
    sceneSVG: sceneFire,
    sceneAlt: "a fire that's spreading",
    clue: "Fire! Fire!",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  [HUNGER]: {
    id: HUNGER,
    time: 20,
    audioInstruction: sample([
      SFX_TYPES.hungerInstructionGirl,
      SFX_TYPES.hungerInstructionBoy
    ]),
    audioQuestion: sample([
      SFX_TYPES.defaultQuestionGirl,
      SFX_TYPES.defaultQuestionBoy
    ]),
    requiredItem: food,
    numberItemsToSolve: 5,
    numberCorrectChosen: 0,
    peopleSavedRange: [1, 5],
    petsSaved: 1,
    imageSVG: hunger,
    imageAlt: "a hungry person",
    imageLabel: "Hungry People",
    callToAction: "Let's help those hungry people.",
    sceneSVG: sceneHunger,
    sceneAlt: "a hungry person",
    clue: "I'm so hungry!",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  [HOLE]: {
    id: HOLE,
    time: 20,
    audioInstruction: SFX_TYPES.holeInstructionBoy,
    audioQuestion: sample([
      SFX_TYPES.defaultQuestionGirl,
      SFX_TYPES.defaultQuestionBoy
    ]),
    requiredItem: rope,
    numberItemsToSolve: 3,
    numberCorrectChosen: 0,
    peopleSavedRange: [1, 1],
    petsSaved: 0,
    imageSVG: hole,
    imageAlt: "a person reaching out of a hole",
    imageLabel: "Trapped People",
    callToAction: "Let's help that trapped person!",
    sceneSVG: sceneHole,
    sceneAlt: "a person reaching out of a crack in the road",
    clue: "Help! I can't get out!",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  [INJURY]: {
    id: INJURY,
    time: 20,
    audioInstruction: SFX_TYPES.injuryInstructionBoy,
    audioQuestion: sample([
      SFX_TYPES.defaultQuestionGirl,
      SFX_TYPES.defaultQuestionBoy
    ]),
    requiredItem: firstAidKit,
    numberItemsToSolve: 5,
    numberCorrectChosen: 0,
    peopleSavedRange: [1, 5],
    petsSaved: 0,
    imageSVG: injury,
    imageAlt: "an injured person",
    imageLabel: "Hurt People",
    callToAction: "Let's help those hurt people.",
    sceneSVG: sceneInjury,
    sceneAlt: "an injured person",
    clue: "Ow!",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  [WEATHER]: {
    id: WEATHER,
    time: 20,
    audioInstruction: SFX_TYPES.coldInstructionBoy,
    audioQuestion: SFX_TYPES.coldQuestionBoy,
    requiredItem: tent,
    numberItemsToSolve: 2,
    numberCorrectChosen: 0,
    peopleSavedRange: [1, 3],
    petsSaved: 0,
    imageSVG: weather,
    imageAlt: "a thunderstorm",
    imageLabel: "People in Rain",
    callToAction: "Let's help those people get out of the rain.",
    sceneSVG: sceneWeather,
    sceneAlt: "a thunderstorm",
    clue: "It's cold out here!",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  [LOST_PET]: {
    id: LOST_PET,
    time: 20,
    audioInstruction: SFX_TYPES.lostPetInstructionBoy,
    audioQuestion: sample([
      SFX_TYPES.defaultQuestionGirl,
      SFX_TYPES.defaultQuestionBoy
    ]),
    requiredItem: flashlight,
    numberItemsToSolve: 2,
    numberCorrectChosen: 0,
    peopleSavedRange: [0, 0],
    petsSaved: 1,
    imageSVG: lostPet,
    imageAlt: "paw prints",
    imageLabel: "Lost Pet",
    callToAction: "Let's help find a lost pet.",
    sceneSVG: sceneLostPet,
    sceneAlt: "a place the pet may be hiding",
    clue: "Help! I can't find my cat!",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  },
  [THIRST]: {
    id: THIRST,
    time: 20,
    audioInstruction: SFX_TYPES.thirstInstructionGirl,
    audioQuestion: sample([
      SFX_TYPES.defaultQuestionGirl,
      SFX_TYPES.defaultQuestionBoy
    ]),
    requiredItem: water,
    numberItemsToSolve: 5,
    numberCorrectChosen: 0,
    peopleSavedRange: [1, 5],
    petsSaved: 1,
    imageSVG: thirst,
    imageAlt: "a thirsty person",
    imageLabel: "Thirsty People",
    callToAction: "Let's help these thirsty people.",
    sceneSVG: sceneThirst,
    sceneAlt: "a thirsty person",
    clue: "I'm so thirsty!",
    completed: false,
    completedResults: {
      people: 0,
      pets: 0
    }
  }
};

export const tasksForEnvironment = {
  [URBAN]: {
    saveYourself: [tasks[RUBBLE], tasks[DUST]],
    saveOthers: [
      tasks[INJURY],
      tasks[HOLE],
      tasks[HUNGER],
      tasks[COLD],
      tasks[WEATHER],
      tasks[LOST_PET],
      tasks[THIRST],
      tasks[FIRE]
    ]
  }
};
