import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import HousingDisplacement from "./components/HousingDisplacement";
import BlackPopulationChange from "./components/BlackPopulationChange";
import HomeLoanApprovals from "./components/HomeLoanApprovals";
import HomeOwnershipRates from "./components/HomeOwnershipRates";
import AduDistributions from "./components/AduDistributions";
import HouseholdIncomeByRace from "./components/HouseholdIncomeByRace";

const CardRegistry = [
  {
    slug: "household-income-by-race",
    component: HouseholdIncomeByRace
  },
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
