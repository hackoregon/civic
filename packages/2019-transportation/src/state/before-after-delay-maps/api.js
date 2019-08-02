import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/transportation-systems";
const LIMIT = 1000; // default is 100, should fetch all for area

const apiDesc = {
  getDisturbanceStops: {
    url: `${HOST}/trimet-stop-events/disturbance-stops/?limit=${LIMIT}`
  }
};

const beforeAfterDelayMapsApi = new Reduxful(
  "beforeAfterDelayMapsApi",
  apiDesc,
  apiConfig
);

export default beforeAfterDelayMapsApi;
