import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import DemoEducation from "./components/DemoEducation";

const CardRegistry = [
  {
    slug: "demo-education",
    component: DemoEducation
  }
];

export { App, Routes, Reducers, CardRegistry };
