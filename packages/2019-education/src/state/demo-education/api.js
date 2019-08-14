import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

// TODO: put correct HOST
const HOST = "https://service.civicpdx.org/transportation-systems";

// TODO: put correct url and update "getMockRidershipData" data name throughout package
const apiDesc = {
  getMockRidershipData: {
    url: `${HOST}/passenger-census/system/annual/averages/?format=json`
  }
};

const demoEducationData = new Reduxful("demoEducationData", apiDesc, apiConfig);

export default demoEducationData;
