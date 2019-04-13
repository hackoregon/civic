import { App, Example, NotFoundPage, CrashData } from "./components/index";

const routes = () => [
  {
    path: "transportation",
    name: "transportation",
    component: App,
    childRoutes: [
      {
        path: "example",
        component: Example
      },
      {
        path: "notfoundpage",
        component: NotFoundPage
      },
      {
        path: "crash-data",
        component: CrashData
      }
    ]
  }
];

export default routes;
