import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  getBusAmRushSummaryData: {
    url:
      "http://service.civicpdx.org/transportation2019/v1/toad/busAmRushSummary/?limit=10000",
    dataTransform: data => data
  },
  getOnOffsData: {
    url: `${HOST}/passenger-census/system/annual/averages/?format=json`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const morningRushData = new Reduxful("morningRushData", apiDesc, apiConfig);

export default morningRushData;
