import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import TemplateFileCard from "./components/TemplateFileCard";
import DemoCard from "./components/DemoCard";
import TemplateAPICard from "./components/TemplateAPICard";

const CardRegistry = [
  {
    slug: "template-file-card",
    component: TemplateFileCard
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
