import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import TemplateCard from "./components/TemplateCard";
import DemoCard from "./components/DemoCard";
import TemplateAPICard from "./components/TemplateAPICard";

const CardRegistry = [
  {
    slug: "template-card",
    component: TemplateCard
  },
  {
    slug: "demo-card",
    component: DemoCard
  },
  {
    slug: "template-api-card",
    component: TemplateAPICard
  }
];

export { App, Routes, Reducers, CardRegistry };
