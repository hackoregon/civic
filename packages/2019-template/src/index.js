import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting new card
import TemplateCard from "./components/TemplateCard";

const CardRegistry = [
  {
    slug: "template-card",
    component: TemplateCard
  }
];

export { App, Routes, Reducers, CardRegistry };
