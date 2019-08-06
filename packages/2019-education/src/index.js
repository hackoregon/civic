import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import EducationCard from "./components/EducationCard";

const CardRegistry = [
  {
    slug: "education-card",
    component: EducationCard
  }
];

export { App, Routes, Reducers, CardRegistry };
