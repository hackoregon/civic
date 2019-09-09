import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/housing2019/v1/api";

const apiDesc = {
  getRedliningMapData: {
    url: `${HOST}/holcportlandredlining/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const holcRedliningData = new Reduxful("holcRedliningData", apiDesc, apiConfig);

export default holcRedliningData;
