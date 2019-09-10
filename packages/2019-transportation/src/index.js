import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import DisturbanceStops from "./components/DisturbanceStops";
import SouthwestMadison from "./components/SouthwestMadison";
import NorthwestEverett from "./components/NorthwestEverett";

const CardRegistry = [
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
