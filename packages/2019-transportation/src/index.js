import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import DisturbanceStops from "./components/DisturbanceStops";
import SouthwestMadison from "./components/SouthwestMadison";
import NorthwestEverett from "./components/NorthwestEverett";
import MorningRush from "./components/MorningRush";
import SystemWideSummary from "./components/SystemWideSummary";

const CardRegistry = [
  {
    slug: "system-wide-summary",
    component: SystemWideSummary
  },
  {
    slug: "morning-rush",
    component: MorningRush
  },
  {
    slug: "northwest-everett",
    component: NorthwestEverett
  },
  {
    slug: "southwest-madison",
    component: SouthwestMadison
  },
  {
    slug: "disturbance-stops",
    component: DisturbanceStops
  }
];

export { App, Routes, Reducers, CardRegistry };
