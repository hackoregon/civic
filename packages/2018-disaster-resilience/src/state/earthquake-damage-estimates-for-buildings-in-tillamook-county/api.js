import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "http://service.civicpdx.org/disaster-resilience";

const apiDesc = {
  getDamageEstimatesData: {
    url: `${HOST}/api/AebmResults/?format=json&limit=27371`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => {
      return data.results.features;
    }
  }
};

const earthquakeDamageEstimatesForBuildingsInTillamookCountyData = new Reduxful(
  "earthquakeDamageEstimatesForBuildingsInTillamookCountyData",
  apiDesc,
  apiConfig
);

export default earthquakeDamageEstimatesForBuildingsInTillamookCountyData;
