import Corn from "../../assets/corn.svg";
import CornColor from "../../assets/corn-color.svg";
import Water from "../../assets/water.svg";
import WaterColor from "../../assets/water-color.svg";
import FireExtinguisher from "../../assets/fire-extinguisher.svg";
import FireExtinguisherColor from "../../assets/fire-extinguisher-color.svg";
import FirstAid from "../../assets/first-aid-kit.svg";
import FirstAidColor from "../../assets/first-aid-kit-color.svg";
import Flashlight from "../../assets/flashlight.svg";
import FlashlightColor from "../../assets/flashlight-color.svg";
import WalkieTalkie from "../../assets/walkie-talkie.svg";
import WalkieTalkieColor from "../../assets/walkie-talkie-color.svg";

export const FOOD = {
  id: "FOOD",
  emptySvg: Corn,
  fullSvg: CornColor,
  quantity: 0,
  kitsFilledByItem: 0
};
export const WATER = {
  id: "WATER",
  emptySvg: Water,
  fullSvg: WaterColor,
  quantity: 0,
  kitsFilledByItem: 0
};
export const FIRE_EXTINGUISHER = {
  id: "FIRE_EXTINGUISHER",
  emptySvg: FireExtinguisher,
  fullSvg: FireExtinguisherColor,
  quantity: 0,
  kitsFilledByItem: 0
};
export const FIRST_AID_KIT = {
  id: "FIRST_AID_KIT",
  emptySvg: FirstAid,
  fullSvg: FirstAidColor,
  quantity: 0,
  kitsFilledByItem: 0
};
export const FLASHLIGHT = {
  id: "FLASHLIGHT",
  emptySvg: Flashlight,
  fullSvg: FlashlightColor,
  quantity: 0,
  kitsFilledByItem: 0
};
export const WALKIE_TALKIE = {
  id: "WALKIE_TALKIE",
  emptySvg: WalkieTalkie,
  fullSvg: WalkieTalkieColor,
  quantity: 0,
  kitsFilledByItem: 0
};

export const MINIMUM_KIT = {
  FOOD: { ...FOOD, quantity: 1 },
  WATER: { ...WATER, quantity: 1 },
  FIRE_EXTINGUISHER: { ...FIRE_EXTINGUISHER, quantity: 1 },
  FIRST_AID_KIT: { ...FIRST_AID_KIT, quantity: 1 },
  FLASHLIGHT: { ...FLASHLIGHT, quantity: 1 },
  WALKIE_TALKIE: { ...WALKIE_TALKIE, quantity: 1 }
};

export default {
  FOOD,
  WATER,
  FIRE_EXTINGUISHER,
  FIRST_AID_KIT,
  FLASHLIGHT,
  WALKIE_TALKIE
};
