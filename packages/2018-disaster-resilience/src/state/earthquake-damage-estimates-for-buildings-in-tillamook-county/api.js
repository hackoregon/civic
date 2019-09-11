import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  getDamageEstimatesData: {
    url: `${HOST}/passenger-census/system/annual/averages/?format=json`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const earthquakeDamageEstimatesForBuildingsInTillamookCountyData = new Reduxful(
  "earthquakeDamageEstimatesForBuildingsInTillamookCountyData",
  apiDesc,
  apiConfig
);

export default earthquakeDamageEstimatesForBuildingsInTillamookCountyData;
