/* eslint-disable import/no-named-as-default */
import LifeAlteringEvent from "./components/LifeAlteringEvent";
import ViolentShakingAndGroundDeformation from "./components/ViolentShakingAndGroundDeformation";
import YouAndYourNeighbors from "./components/YouAndYourNeighbors";
import IncreasingSocialCapital from "./components/IncreasingSocialCapital";
import ProactivePlanning from "./components/ProactivePlanning";
import SignificantStructuralDamage from "./components/SignificantStructuralDamage";
import WhatYouCanDoToPrepare from "./components/WhatYouCanDoToPrepare";
import TillamookCountyEarthquakeCasualtyEstimates from "./components/TillamookCountyEarthquakeCasualtyEstimates";

export default [
  {
    slug: "what-you-can-do-to-prepare-for-an-earthquake",
    component: WhatYouCanDoToPrepare
  },
  {
    slug: "significant-structural-damage",
    component: SignificantStructuralDamage
  },
  {
    slug: "proactive-planning-for-city-wide-resilience",
    component: ProactivePlanning
  },
  {
    slug: "life-altering-event",
    component: LifeAlteringEvent
  },
  {
    slug: "violent-shaking-and-ground-deformation",
    component: ViolentShakingAndGroundDeformation
  },
  {
    slug: "you-and-your-neighbors-in-the-earthquake",
    component: YouAndYourNeighbors
  },
  {
    slug: "increasing-social-capital",
    component: IncreasingSocialCapital
  },
  {
    slug: "tillamook-county-earthquake-casualty-estimates",
    component: TillamookCountyEarthquakeCasualtyEstimates
  }
];
