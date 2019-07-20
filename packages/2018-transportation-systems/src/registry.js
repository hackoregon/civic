/* eslint-disable import/no-named-as-default */
import DeclineInRidership from "./components/DeclineInRidership";
import HistoricalChangesToBusService from "./components/HistoricalChangesToBusService";
import ServiceAndRidership from "./components/ServiceAndRidership";
import DriversOfPublicTransitParticipation from "./components/DriversOfPublicTransitParticipation";
import ExploreBusServiceAndEquity from "./components/ExploreBusServiceAndEquity";
import MobilityTrendsUsingRealTimeData from "./components/MobilityTrendsUsingRealTimeData";
import TheSecretIsInTheSensors from "./components/TheSecretIsInTheSensors";
import DiveDeeperIntoTransportationData from "./components/DiveDeeperIntoTransportationData";

export default [
  {
    slug: "plateau-in-ridership",
    component: DeclineInRidership
  },
  {
    slug: "historical-changes-to-bus-service",
    component: HistoricalChangesToBusService
  },
  {
    slug: "service-and-ridership",
    component: ServiceAndRidership
  },
  {
    slug: "drivers-of-public-transit-participation",
    component: DriversOfPublicTransitParticipation
  },
  {
    slug: "explore-bus-service-and-equity",
    component: ExploreBusServiceAndEquity
  },
  {
    slug: "mobility-trends-using-real-time-data",
    component: MobilityTrendsUsingRealTimeData
  },
  {
    slug: "the-secret-is-in-the-sensors",
    component: TheSecretIsInTheSensors
  },
  {
    slug: "dive-deeper-into-transportation-data",
    component: DiveDeeperIntoTransportationData
  }
];
