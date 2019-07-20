import App from "./components/LandingPage";
import Game from "./components/Game";

const routes = () => [
  {
    path: "/",
    name: "disaster",
    component: App,
    indexRoute: App,
    childRoutes: [
      {
        path: "game",
        name: "game",
        component: Game
      }
    ]
  }
];

export default routes;
