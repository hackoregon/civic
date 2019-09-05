import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org";

const apiDesc = {
  getHouseholdIncomeByRaceData: {
    url: `${HOST}/housing2019/v1/api/medianhouseholdincomebyrace1990t2017msa/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const householdIncomeByRaceData = new Reduxful(
  "householdIncomeByRaceData",
  apiDesc,
  apiConfig
);

export default householdIncomeByRaceData;
