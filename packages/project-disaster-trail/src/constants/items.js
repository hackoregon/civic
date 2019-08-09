import CornEmpty from "../../assets/corn.svg";
import CornColor from "../../assets/corn-color.svg";
import WaterEmpty from "../../assets/water.svg";
import WaterColor from "../../assets/water-color.svg";
import FireExtinguisherEmpty from "../../assets/fire-extinguisher.svg";
import FireExtinguisherColor from "../../assets/fire-extinguisher-color.svg";
import FirstAidEmpty from "../../assets/first-aid-kit.svg";
import FirstAidColor from "../../assets/first-aid-kit-color.svg";
import FlashlightEmpty from "../../assets/flashlight.svg";
import FlashlightColor from "../../assets/flashlight-color.svg";
import WalkieTalkieEmpty from "../../assets/walkie-talkie.svg";
import WalkieTalkieColor from "../../assets/walkie-talkie-color.svg";

export const food = "FOOD";
export const water = "WATER";
export const fireExtinguisher = "FIRE_EXTINGUISHER";
export const firstAidKit = "FIRST_AID_KIT";
export const flashlight = "FLASHLIGHT";
export const walkieTalkie = "WALKIE_TALKIE";

// No current svgs
export const protectiveGear = "PROTECTIVE_GEAR";

export const FOOD = {
  id: food,
  emptySvg: CornEmpty,
  fullSvg: CornColor,
  imgAlt: "food kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 1
};
export const WATER = {
  id: water,
  emptySvg: WaterEmpty,
  fullSvg: WaterColor,
  imgAlt: "water kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 1
};
export const FIRE_EXTINGUISHER = {
  id: fireExtinguisher,
  emptySvg: FireExtinguisherEmpty,
  fullSvg: FireExtinguisherColor,
  imgAlt: "fire extinguisher kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 1
};
export const FIRST_AID_KIT = {
  id: firstAidKit,
  emptySvg: FirstAidEmpty,
  fullSvg: FirstAidColor,
  imgAlt: "first aid kit kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 1
};
export const FLASHLIGHT = {
  id: flashlight,
  emptySvg: FlashlightEmpty,
  fullSvg: FlashlightColor,
  imgAlt: "flashlight kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 1
};
export const WALKIE_TALKIE = {
  id: walkieTalkie,
  emptySvg: WalkieTalkieEmpty,
  fullSvg: WalkieTalkieColor,
  imgAlt: "walkie talkie kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 1
};

// TODO: update items
export const PROTECTIVE_GEAR = {
  id: protectiveGear,
  emptySvg: "https://image.flaticon.com/icons/svg/1705/1705460.svg",
  fullSvg: "https://image.flaticon.com/icons/svg/1705/1705463.svg",
  imgAlt: "protective gear kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 1
};

export default {
  FOOD,
  WATER,
  FIRE_EXTINGUISHER,
  FIRST_AID_KIT,
  FLASHLIGHT,
  WALKIE_TALKIE,
  PROTECTIVE_GEAR
};
