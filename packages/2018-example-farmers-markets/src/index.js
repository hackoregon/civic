import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

import FarmersMarketsOverTimeNew from "./components/FarmersMarketsOverTimeNew";
import PortlandFarmersMarketsNew from "./components/PortlandFarmersMarketsNew";

const CardRegistry = [
  {
    slug: "portland-farmers-markets",
    component: PortlandFarmersMarketsNew
  },
  {
    slug: "farmers-markets-over-time",
    component: FarmersMarketsOverTimeNew
  }
];

export { App, Routes, Reducers, CardRegistry };
