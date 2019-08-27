import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import HousingDisplacement from "./components/HousingDisplacement";
import BlackPopulationChange from "./components/BlackPopulationChange";

const CardRegistry = [
  {
    slug: "black-population-change",
    component: BlackPopulationChange
  },
  {
    slug: "housing-displacement",
    component: HousingDisplacement
  }
  // leave space for card injection
];

export { App, Routes, Reducers, CardRegistry };
