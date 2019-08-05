import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import ElectionsCard from "./components/ElectionsCard";

const CardRegistry = [
  {
    slug: "elections-card",
    component: ElectionsCard
  }
];

export { App, Routes, Reducers, CardRegistry };
