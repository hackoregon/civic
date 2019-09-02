import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/disaster-resilience";

const apiDesc = {
  getYouAndYourNeighbors: {
    url: `${HOST}/sandbox/slides/poi/`,
    dataTransform: data => data.slide_data
  },
  getYouAndYourNeighborsCoords: {
    url: `${HOST}/api/DisasterNeighborhoodGrid/?lat=:latitude&long=:longitude`
  }
};

const youAndYourNeighborsGorillaData = new Reduxful(
  "youAndYourNeighborsGorillaData",
  apiDesc,
  apiConfig
);

export default youAndYourNeighborsGorillaData;
