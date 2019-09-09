import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org";

const apiDesc = {
  getResidentialBuildingPermitData: {
    url: `${HOST}/housing2019/v1/api/residentialbuildingpermitdata/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const aduDistributionsData = new Reduxful(
  "aduDistributionsData",
  apiDesc,
  apiConfig
);

export default aduDistributionsData;
