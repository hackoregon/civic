import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  getMockRidershipData: {
    url: `${HOST}/passenger-census/system/annual/averages/?format=json`
  }
};

const newTemplateAPI = new Reduxful("newTemplateAPI", apiDesc, apiConfig);

export default newTemplateAPI;
