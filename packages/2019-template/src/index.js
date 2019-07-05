import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import TemplateCardFull from "./components/TemplateCard/indexFullCard";

const CardRegistry = [
  {
    slug: "template-card",
    component: TemplateCardFull
  }
];

export { App, Routes, Reducers, CardRegistry };
