import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

import PortlandFarmersMarkets from "./components/PortlandFarmersMarkets";
import FarmersMarketsOverTime from "./components/FarmersMarketsOverTime";
import FarmersMarketsOverTimeNew from "./components/FarmersMarketsOverTimeNew";

const CardRegistry = [
  {
    slug: "farmers-markets-over-time-new",
    component: FarmersMarketsOverTimeNew
  },
  {
    slug: "portland-farmers-markets",
    component: PortlandFarmersMarkets
  },
  {
    slug: "farmers-markets-over-time",
    component: FarmersMarketsOverTime
  }
];

export { App, Routes, Reducers, CardRegistry };
