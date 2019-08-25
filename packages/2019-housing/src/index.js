import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import HousingDisplacement from "./components/HousingDisplacement";

const CardRegistry = [
  {
    slug: "housing-displacement",
    component: HousingDisplacement
  }
  // leave space for card injection
];

export { App, Routes, Reducers, CardRegistry };
