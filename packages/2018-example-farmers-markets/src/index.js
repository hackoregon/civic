import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

import FarmersMarketsOverTime from "./components/FarmersMarketsOverTime";
import PortlandFarmersMarkets from "./components/PortlandFarmersMarkets";

const CardRegistry = [
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
