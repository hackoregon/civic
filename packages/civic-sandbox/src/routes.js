import App from "./components/App";
import LayerCreate from "./components/LayerCreate";

const routes = () => [
  {
    path: "sandbox",
    name: "sandbox",
    indexRoute: { component: App },
    childRoutes: [
      {
        path: "layercreate",
        component: LayerCreate
      }
    ]
  }
];

export default routes;
