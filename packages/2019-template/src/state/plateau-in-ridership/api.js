import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  getRidershipOverTime: {
    url: `${HOST}/passenger-census/system/annual/averages/?format=json`
  }
};

const plateauInRidershipAPI = new Reduxful(
  "plateauInRidershipAPI",
  apiDesc,
  apiConfig
);

export default plateauInRidershipAPI;
