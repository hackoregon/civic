import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org";

const apiDesc = {
  getTotalLoansData: {
    url: `${HOST}/housing2019/v1/api/totalloans/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  },
  getNcdbCensusTractMap: {
    url: `${HOST}/sandbox/api/PdxMsa2010CensusTracts/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const homeLoanApprovalsData = new Reduxful(
  "homeLoanApprovalsData",
  apiDesc,
  apiConfig
);

export default homeLoanApprovalsData;
