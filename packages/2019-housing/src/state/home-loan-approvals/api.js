import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org";

const apiDesc = {
  getTotalLoansData: {
    url: `${HOST}/housing2019/v1/api/sc2hmdaapprovalbyrace2013t2017/`,
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
