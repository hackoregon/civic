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
import ComputerEmpty from "../../assets/laptop.svg";
import ComputerColor from "../../assets/laptop-color.svg";

// Good kit items
export const blanket = "BLANKET";
export const dustMask = "DUST_MASK";
export const fireExtinguisher = "FIRE_EXTINGUISHER";
export const firstAidKit = "FIRST_AID_KIT";
export const flashlight = "FLASHLIGHT";
export const food = "FOOD";
export const protectiveGear = "PROTECTIVE_GEAR";
export const rope = "ROPE";
export const tent = "TENT";
export const water = "WATER";
// Bad kit items
export const computer = "COMPUTER";

// Good kit items
export const BLANKET = {
  id: blanket,
  emptySvg: "https://image.flaticon.com/icons/svg/1980/1980993.svg",
  fullSvg: "https://image.flaticon.com/icons/svg/1981/1981086.svg",
  imgAlt: "blanket kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const DUST_MASK = {
  id: dustMask,
  emptySvg: "https://image.flaticon.com/icons/svg/1497/1497017.svg",
  fullSvg: "https://image.flaticon.com/icons/svg/1497/1497119.svg",
  imgAlt: "dust mask kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const FIRE_EXTINGUISHER = {
  id: fireExtinguisher,
  emptySvg: FireExtinguisherEmpty,
  fullSvg: FireExtinguisherColor,
  imgAlt: "fire extinguisher kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const FIRST_AID_KIT = {
  id: firstAidKit,
  emptySvg: FirstAidEmpty,
  fullSvg: FirstAidColor,
  imgAlt: "first aid kit kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const FLASHLIGHT = {
  id: flashlight,
  emptySvg: FlashlightEmpty,
  fullSvg: FlashlightColor,
  imgAlt: "flashlight kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const FOOD = {
  id: food,
  emptySvg: CornEmpty,
  fullSvg: CornColor,
  imgAlt: "food kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const PROTECTIVE_GEAR = {
  id: protectiveGear,
  emptySvg: "https://image.flaticon.com/icons/svg/1705/1705460.svg",
  fullSvg: "https://image.flaticon.com/icons/svg/1705/1705463.svg",
  imgAlt: "protective gear kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const ROPE = {
  id: rope,
  emptySvg: "https://image.flaticon.com/icons/svg/1980/1980979.svg",
  fullSvg: "https://image.flaticon.com/icons/svg/1981/1981084.svg",
  imgAlt: "rope kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const TENT = {
  id: tent,
  emptySvg: "https://image.flaticon.com/icons/svg/1175/1175162.svg",
  fullSvg: "https://image.flaticon.com/icons/svg/1175/1175009.svg",
  imgAlt: "tent kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const WATER = {
  id: water,
  emptySvg: WaterEmpty,
  fullSvg: WaterColor,
  imgAlt: "water kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};

// Bad kit items
export const COMPUTER = {
  id: computer,
  emptySvg: ComputerEmpty,
  fullSvg: ComputerColor,
  imgAlt: "cell phone kit item",
  goodKitItem: false,
  pointsForPuttingInKit: 0
};

export default {
  BLANKET,
  DUST_MASK,
  FIRE_EXTINGUISHER,
  FIRST_AID_KIT,
  FLASHLIGHT,
  FOOD,
  PROTECTIVE_GEAR,
  ROPE,
  TENT,
  WATER,
  COMPUTER
};
