import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org";

const apiDesc = {
  getNcdbYearlyData: {
    url: `${HOST}/housing2019/v1/api/ncdbsampleyearly/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const blackPopulationChangeData = new Reduxful(
  "blackPopulationChangeData",
  apiDesc,
  apiConfig
);

export default blackPopulationChangeData;
