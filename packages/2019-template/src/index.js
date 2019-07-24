import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import TemplateCard from "./components/TemplateCard";
import DemoCard from "./components/DemoCard";

const CardRegistry = [
  {
    slug: "template-card",
    component: TemplateCard
  },
  {
    slug: "demo-card",
    component: DemoCard
  }
];

export { App, Routes, Reducers, CardRegistry };
