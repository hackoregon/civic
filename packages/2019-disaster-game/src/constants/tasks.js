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

// Task instructional audio
import howCanIHelp from "../../assets/audio/task_screen_instructional/7_boy_how_can_i_help.mp3";
import rubbleInstructional from "../../assets/audio/task_screen_instructional/12_boy_theres_a_lot_of_rubble.mp3";
import dustInstructional from "../../assets/audio/task_screen_instructional/24_boy_what_can_I_use_to_breathe.mp3";
import hungerInstructional from "../../assets/audio/task_screen_instructional/11_boy_all_these_people_are_hungry.mp3";
import holeInstructional from "../../assets/audio/task_screen_instructional/15_boy_help_i_cant_get_out.mp3";
import coldInstructional from "../../assets/audio/task_screen_instructional/17_boy_its_cold_out_here.mp3";
import lostPetInstructional from "../../assets/audio/task_screen_instructional/19_boy_help_i_cant_find_my_cat.mp3";
import injuryInstructional from "../../assets/audio/task_screen_instructional/21_boy_how_can_i_help_more_injured_people.mp3";
import weatherInstructional from "../../assets/audio/task_screen_instructional/22_boy_how_can_i_help_people_with_no_place_to_stay.mp3";
// import fireInstructional from "../../assets/audio/task_screen_instructional/26_boy_how_can_i_put_out_a_fire.mp3";
// import thirstInstructional from "../../assets/audio/task_screen_instructional/im_so_thirsty_child2.mp3";

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
    audioInstructional: rubbleInstructional,
    requiredItem: protectiveGear,
    numberItemsToSolve: 3,
    points: 3,
    imageSVG: rubble,
    imageAlt: "a rocky road",
    sceneSVG: sceneRubble,
    sceneAlt: "rubble in your way",
    clue: "Lots of sharp rocks and broken glass around here!",
    tickerTape:
      "Gloves, boots, and goggles can help prevent injury when earthquakes cause large amounts of debris.",
    locations: [[-122.6655, 45.5081]]
  },
  [DUST]: {
    id: DUST,
    time: 15,
    audioInstructional: dustInstructional,
    requiredItem: dustMask,
    numberItemsToSolve: 3,
    points: 3,
    imageSVG: dust,
    imageAlt: "a person coughing in the dust",
    sceneSVG: sceneDust,
    sceneAlt: "a person coughing in the dust",
    clue: "It's getting hard to breathe here!",
    tickerTape:
      "When buildings collapse, lots of debris is thrown into the air. Air quality can be very poor after an earthquake.",
    locations: [[-122.676169, 45.516485]]
  },
  // Save Others
  [COLD]: {
    id: COLD,
    time: 15,
    audioInstructional: coldInstructional,
    requiredItem: blanket,
    numberItemsToSolve: 3,
    points: 3,
    imageSVG: cold,
    imageAlt: "a shivering person",
    sceneSVG: sceneCold,
    sceneAlt: "a shivering person",
    clue: "Brrr... It's c-c-cold out here!",
    tickerTape: "Be prepared for all potential weather conditions!",
    locations: [[-122.610302, 45.504791], [-122.675011, 45.503044]]
  },
  // [FIRE]: {
  //   id: FIRE,
  //   time: 15,
  //   audioInstructional: fireInstructional,
  //   requiredItem: fireExtinguisher,
  //   numberItemsToSolve: 5,
  //   points: 5,
  //   imageSVG: fire,
  //   imageAlt: "fire",
  //   sceneSVG: sceneFire,
  //   sceneAlt: "a fire that's spreading",
  // clue: "Fire! Fire!",
  // tickerTape: "Keep fire extinguishers up-to-date and serviced annually!",
  //   locations: [[-122.615447, 45.514957], [-122.685672, 45.525356]]
  // },
  [HUNGER]: {
    id: HUNGER,
    time: 15,
    audioInstructional: hungerInstructional,
    requiredItem: food,
    numberItemsToSolve: 5,
    points: 5,
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
    audioInstructional: holeInstructional,
    requiredItem: rope,
    numberItemsToSolve: 3,
    points: 3,
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
    audioInstructional: injuryInstructional,
    requiredItem: firstAidKit,
    numberItemsToSolve: 5,
    points: 7,
    imageSVG: injury,
    imageAlt: "an injured person",
    sceneSVG: sceneInjury,
    sceneAlt: "an injured person",
    clue: "Ow!",
    tickerTape:
      "After a major earthquake, there could be 27,000 injured people in Portland.",
    locations: [[-122.678618, 45.52018]]
  },
  [WEATHER]: {
    id: WEATHER,
    time: 15,
    audioInstructional: weatherInstructional,
    requiredItem: tent,
    numberItemsToSolve: 2,
    points: 4,
    imageSVG: weather,
    imageAlt: "a thunderstorm",
    sceneSVG: sceneWeather,
    sceneAlt: "a thunderstorm",
    clue: "Brrrr… It's c-c-cold and wet out here!",
    tickerTape:
      "If possible, plan to shelter in place without gas, water, or electricity!",
    locations: [[-122.651841, 45.496852], [-122.638194, 45.503651]]
  },
  [LOST_PET]: {
    id: LOST_PET,
    time: 15,
    audioInstructional: lostPetInstructional,
    requiredItem: flashlight,
    numberItemsToSolve: 2,
    points: 4,
    imageSVG: lostPet,
    imageAlt: "paw prints",
    sceneSVG: sceneLostPet,
    sceneAlt: "a place the pet may be hiding",
    clue: "Help! I can't find my cat!",
    tickerTape:
      "Do not enter buildings after an earthquake, even to rescue lost pets!",
    locations: [[-122.629352, 45.531557], [-122.651925, 45.507501]]
  },
  [THIRST]: {
    id: THIRST,
    time: 15,
    audioInstructional: howCanIHelp,
    requiredItem: water,
    numberItemsToSolve: 5,
    points: 5,
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
    saveOthers: [INJURY, HOLE, HUNGER, COLD, WEATHER, LOST_PET, THIRST]
  }
};
