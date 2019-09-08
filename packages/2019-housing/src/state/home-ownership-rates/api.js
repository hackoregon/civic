import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org";

const apiDesc = {
  getHomeownershipByRaceData: {
    url: `${HOST}/housing2019/v1/api/multnomahhomeownershipbyrace/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const homeOwnershipRatesData = new Reduxful(
  "homeOwnershipRatesData",
  apiDesc,
  apiConfig
);

export default homeOwnershipRatesData;
