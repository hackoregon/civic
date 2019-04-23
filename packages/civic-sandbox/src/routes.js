import App from "./components/App";
import Sandbox from "./components/Sandbox";

const routes = () => [
  {
    path: "sandbox",
    name: "sandbox",
    component: App,
    childRoutes: [
      {
        path: "map",
        component: Sandbox
      }
    ]
  }
];

export default routes;
