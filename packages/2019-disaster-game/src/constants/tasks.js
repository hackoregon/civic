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

// Task instruction audio
import rubbleInstruction from "../../assets/audio/task_screen/12_boy_theres_a_lot_of_rubble.mp3";
import dustInstruction from "../../assets/audio/task_screen/13_boy_its_getting_hard_to_breathe_here.mp3";
import hungerInstruction from "../../assets/audio/task_screen/11_boy_all_these_people_are_hungry.mp3";
import holeInstruction from "../../assets/audio/task_screen/15_boy_help_i_cant_get_out.mp3";
import coldInstruction from "../../assets/audio/task_screen/17_boy_its_cold_out_here.mp3";
import lostPetInstruction from "../../assets/audio/task_screen/19_boy_help_i_cant_find_my_cat.mp3";
// import injuryInstruction from "../../assets/audio/task_screen/21_boy_how_can_i_help_more_injured_people.mp3";
import injuryInstruction from "../../assets/audio/task_screen/16_boy_ow.mp3";
import weatherQuestion from "../../assets/audio/task_screen/22_boy_how_can_i_help_people_with_no_place_to_stay.mp3";
// import fireInstruction from "../../assets/audio/task_screen/26_boy_how_can_i_put_out_a_fire.mp3";
import fireInstruction from "../../assets/audio/task_screen/18_boy_fire_fire.mp3";
import thirstInstruction from "../../assets/audio/task_screen/im_so_thirsty_child2.mp3";

// Task question audio
import defaultQuestion from "../../assets/audio/task_screen/7_boy_how_can_i_help.mp3";
import dustQuestion from "../../assets/audio/task_screen/24_boy_what_can_I_use_to_breathe.mp3";
import rubbleQuestion from "../../assets/audio/task_screen/23_boy_how_can_i_prevent_getting_cut.mp3";

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
    audioInstruction: rubbleInstruction,
    audioQuestion: rubbleQuestion,
    requiredItem: protectiveGear,
    numberItemsToSolve: 3,
    // peopleSavedRange: [1, 1],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: rubble,
    imageAlt: "a rocky road",
    sceneSVG: sceneRubble,
    sceneAlt: "rubble in your way",
    clue: "Lots of sharp rocks and broken glass around here!",
    tickerTape:
      "Gloves, boots, and goggles can help prevent injury when there’s lots of debris.",
    locations: [[-122.6655, 45.5081]]
  },
  [DUST]: {
    id: DUST,
    time: 15,
    audioInstruction: dustInstruction,
    audioQuestion: dustQuestion,
    requiredItem: dustMask,
    numberItemsToSolve: 3,
    // peopleSavedRange: [1, 1],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: dust,
    imageAlt: "a person coughing in the dust",
    sceneSVG: sceneDust,
    sceneAlt: "a person coughing in the dust",
    clue: "It's getting hard to breathe here!",
    tickerTape:
      "Lots of debris will cause poor air quality after an earthquake.",
    locations: [[-122.676169, 45.516485]]
  },
  // Save Others
  [COLD]: {
    id: COLD,
    time: 15,
    audioInstruction: coldInstruction,
    audioQuestion: defaultQuestion,
    requiredItem: blanket,
    numberItemsToSolve: 3,
    // peopleSavedRange: [1 - 5],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: cold,
    imageAlt: "a shivering person",
    sceneSVG: sceneCold,
    sceneAlt: "a shivering person",
    clue: "Brrr... It's c-c-cold out here!",
    tickerTape: "Plan for all potential weather conditions!",
    locations: [[-122.610302, 45.504791], [-122.675011, 45.503044]]
  },
  [FIRE]: {
    id: FIRE,
    time: 15,
    audioInstruction: fireInstruction,
    audioQuestion: defaultQuestion,
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
    audioInstruction: hungerInstruction,
    audioQuestion: defaultQuestion,
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
    audioInstruction: holeInstruction,
    audioQuestion: defaultQuestion,
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
    audioInstruction: injuryInstruction,
    audioQuestion: defaultQuestion,
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
    tickerTape:
      "There could be 27,000 injured people in the Portland area after a major earthquake.",
    locations: [[-122.678618, 45.52018]]
  },
  [WEATHER]: {
    id: WEATHER,
    time: 15,
    audioInstruction: coldInstruction,
    audioQuestion: weatherQuestion,
    requiredItem: tent,
    numberItemsToSolve: 2,
    // peopleSavedRange: [2, 15],
    // petsSaved: 0,
    // matchLockBonusMultiplier: 1.2,
    imageSVG: weather,
    imageAlt: "a thunderstorm",
    sceneSVG: sceneWeather,
    sceneAlt: "a thunderstorm",
    clue: "Brrrr… It's c-c-cold and wet out here!",
    tickerTape: "Plan for all potential weather conditions!",
    locations: [[-122.651841, 45.496852], [-122.638194, 45.503651]]
  },
  [LOST_PET]: {
    id: LOST_PET,
    time: 15,
    audioInstruction: lostPetInstruction,
    audioQuestion: defaultQuestion,
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
    audioInstruction: thirstInstruction,
    audioQuestion: defaultQuestion,
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
