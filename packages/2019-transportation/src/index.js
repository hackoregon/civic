import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import DisturbanceStops from "./components/DisturbanceStops";

const CardRegistry = [
  {
    slug: "disturbance-stops",
    component: DisturbanceStops
  }
];

export { App, Routes, Reducers, CardRegistry };
