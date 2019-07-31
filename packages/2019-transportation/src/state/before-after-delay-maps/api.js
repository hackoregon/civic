import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  getDisturbanceStops: {
    url: `${HOST}/trimet-stop-events/disturbance-stops/`
  }
};

const beforeAfterDelayMapsApi = new Reduxful(
  "beforeAfterDelayMapsApi",
  apiDesc,
  apiConfig
);

export default beforeAfterDelayMapsApi;
