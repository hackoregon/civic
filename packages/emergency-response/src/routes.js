import { App, Example, NotFoundPage } from "./components/index";

const routes = () => [
  {
    path: "emergency",
    name: "emergency",
    component: App,
    childRoutes: [
      {
        path: "example",
        component: Example
      },
      {
        path: "notfoundpage",
        component: NotFoundPage
      }
    ]
  }
];

export default routes;
