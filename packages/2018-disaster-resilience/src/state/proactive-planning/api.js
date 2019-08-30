import Reduxful from "reduxful";

import requestAdapter from "../request-adapter";
import getProactivePlanningData from "./data-parser";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/disaster-resilience";

// API DESCRIPTION
const apiDesc = {
  getProactivePlanningData: {
    url: `${HOST}/api/DisasterNeighborhoodView/?limit=150`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => getProactivePlanningData(data.results)
  }
};

const proactivePlanningData = new Reduxful(
  "proactivePlanningData",
  apiDesc,
  apiConfig
);

export default proactivePlanningData;
