import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import HousingDisplacement from "./components/HousingDisplacement";
import BlackPopulationChange from "./components/BlackPopulationChange";
import HomeLoanApprovals from "./components/HomeLoanApprovals";
import HomeOwnershipRates from "./components/HomeOwnershipRates";
import AduDistributions from "./components/AduDistributions";

const CardRegistry = [
  {
    slug: "adu-distributions",
    component: AduDistributions
  },
  {
    slug: "home-ownership-rates",
    component: HomeOwnershipRates
  },
  {
    slug: "home-loan-approvals",
    component: HomeLoanApprovals
  },
  {
    slug: "black-population-change",
    component: BlackPopulationChange
  },
  {
    slug: "housing-displacement",
    component: HousingDisplacement
  }
  // leave space for card injection
];

export { App, Routes, Reducers, CardRegistry };
