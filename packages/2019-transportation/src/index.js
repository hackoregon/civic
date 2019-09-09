import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import TransportationCard from "./components/TransportationCard";
import DisturbanceStops from "./components/DisturbanceStops";

const CardRegistry = [
  {
    slug: "disturbance-stops",
    component: DisturbanceStops
  },
  {
    slug: "transportation-card",
    component: TransportationCard
  }
];

export { App, Routes, Reducers, CardRegistry };
