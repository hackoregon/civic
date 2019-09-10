import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

// const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  getEarthquakeCasualtiesData: {
    url: `https://gist.githubusercontent.com/karenng-civicsoftware/b546be2d404a09be4e0572cb491f5d77/raw/3b77acf988000571b085d9559801e9cbc095af2d/aebm_results_storycard1_and_2.json`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const tillamookCountyEarthquakeCasualtyEstimatesData = new Reduxful(
  "tillamookCountyEarthquakeCasualtyEstimatesData",
  apiDesc,
  apiConfig
);

export default tillamookCountyEarthquakeCasualtyEstimatesData;
