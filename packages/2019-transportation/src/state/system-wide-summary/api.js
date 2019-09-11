import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const apiDesc = {
  getBusSystemWideSummaryData: {
    url: `http://service.civicpdx.org/transportation2019/v1/toad/busSystemWideSummary/`
  }
};

const systemWideSummaryData = new Reduxful(
  "systemWideSummaryData",
  apiDesc,
  apiConfig
);

export default systemWideSummaryData;
