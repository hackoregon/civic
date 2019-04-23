import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

import PortlandFarmersMarkets from "./components/PortlandFarmersMarkets";
import FarmersMarketsOverTime from "./components/FarmersMarketsOverTime";

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
