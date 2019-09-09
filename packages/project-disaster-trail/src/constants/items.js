import FoodEmpty from "../../assets/kit_icons/unfilled-food.svg";
import FoodColor from "../../assets/kit_icons/filled-food.svg";
import WaterEmpty from "../../assets/kit_icons/unfilled-water.svg";
import WaterColor from "../../assets/kit_icons/filled-water.svg";
import FirstAidEmpty from "../../assets/kit_icons/unfilled-first-aid-kit.svg";
import FirstAidColor from "../../assets/kit_icons/filled-first-aid-kit.svg";
import FlashlightEmpty from "../../assets/kit_icons/unfilled-flashlight.svg";
import FlashlightColor from "../../assets/kit_icons/filled-flashlight.svg";
import BlanketEmpty from "../../assets/kit_icons/unfilled-blanket.svg";
import BlanketColor from "../../assets/kit_icons/filled-blanket.svg";
import DustMaskEmpty from "../../assets/kit_icons/unfilled-dust-mask.svg";
import DustMaskColor from "../../assets/kit_icons/filled-dust-mask.svg";
import ProtectiveGearEmpty from "../../assets/kit_icons/unfilled-protective-gear.svg";
import ProtectiveGearColor from "../../assets/kit_icons/filled-protective-gear.svg";
import RopeEmpty from "../../assets/kit_icons/unfilled-rope.svg";
import RopeColor from "../../assets/kit_icons/filled-rope.svg";
import TentEmpty from "../../assets/kit_icons/unfilled-tent.svg";
import TentColor from "../../assets/kit_icons/filled-tent.svg";
// Temporary good item icons
import FireExtinguisherEmpty from "../../assets/fire-extinguisher.svg";
import FireExtinguisherColor from "../../assets/fire-extinguisher-color.svg";
// Temporary bad item icons
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
  emptySvg: BlanketEmpty,
  fullSvg: BlanketColor,
  imgAlt: "blanket kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const DUST_MASK = {
  id: dustMask,
  emptySvg: DustMaskEmpty,
  fullSvg: DustMaskColor,
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
  emptySvg: FoodEmpty,
  fullSvg: FoodColor,
  imgAlt: "food kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const PROTECTIVE_GEAR = {
  id: protectiveGear,
  emptySvg: ProtectiveGearEmpty,
  fullSvg: ProtectiveGearColor,
  imgAlt: "protective gear kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const ROPE = {
  id: rope,
  emptySvg: RopeEmpty,
  fullSvg: RopeColor,
  imgAlt: "rope kit item",
  goodKitItem: true,
  pointsForPuttingInKit: 10
};
export const TENT = {
  id: tent,
  emptySvg: TentEmpty,
  fullSvg: TentColor,
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
