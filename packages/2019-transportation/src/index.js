import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import DisturbanceStops from "./components/DisturbanceStops";
import SouthwestMadison from "./components/SouthwestMadison";
import NorthwestEverett from "./components/NorthwestEverett";
import MorningRush from "./components/MorningRush";

const CardRegistry = [
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
