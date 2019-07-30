import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import TransportationCard from "./components/TransportationCard";

const CardRegistry = [
  {
    slug: "transportation-card",
    component: TransportationCard
  }
];

export { App, Routes, Reducers, CardRegistry };
