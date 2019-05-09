/* eslint-disable import/no-named-as-default */
import LifeAlteringEvent from "./components/LifeAlteringEvent";
import ViolentShakingAndGroundDeformation from "./components/ViolentShakingAndGroundDeformation";
import SignificantStructuralDamage from "./components/SignificantStructuralDamage";
import YouAndYourNeighbors from "./components/YouAndYourNeighbors";
import WhatYouCanDoToPrepare from "./components/WhatYouCanDoToPrepare";
import IncreasingSocialCapital from "./components/IncreasingSocialCapital";
import ProactivePlanning from "./components/ProactivePlanning";

export default [
  {
    slug: "life-altering-event",
    component: LifeAlteringEvent
  },
  {
    slug: "violent-shaking-and-ground-deformation",
    component: ViolentShakingAndGroundDeformation
  },
  {
    slug: "significant-structural-damage",
    component: SignificantStructuralDamage
  },
  {
    slug: "you-and-your-neighbors-in-the-earthquake",
    component: YouAndYourNeighbors
  },
  {
    slug: "what-you-can-do-to-prepare-for-an-earthquake",
    component: WhatYouCanDoToPrepare
  },
  {
    slug: "increasing-social-capital",
    component: IncreasingSocialCapital
  },
  {
    slug: "proactive-planning-for-city-wide-resilience",
    component: ProactivePlanning
  }
];
