import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org";

const apiDesc = {
  getAnnualHomeAppreciationData: {
    url: `${HOST}/housing2019/v1/api/portlandhomeappreciationannuallysince1990ish/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  },
  getHomeownershipByRaceData: {
    url: `${HOST}/housing2019/v1/api/multnomahhomeownershipbyrace/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  },
  getHomeInflationData: {
    url: `${HOST}/housing2019/v1/api/homeinflationkriging/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const homeAppreciationData = new Reduxful(
  "homeAppreciationData",
  apiDesc,
  apiConfig
);

export default homeAppreciationData;
