import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import HousingDisplacement from "./components/HousingDisplacement";

const CardRegistry = [
  {
    slug: "portland-population-change-over-time",
    component: HousingDisplacement
  }
];

export { App, Routes, Reducers, CardRegistry };
