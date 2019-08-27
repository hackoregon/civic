import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/housing2019/v1/api";

const apiDesc = {
  getHomeownershipByRaceData: {
    url: `${HOST}/card-one`,
    // Transform data into LineChart data points
    dataTransform: data =>
      Object.keys(data).reduce(
        (acc, year) =>
          acc.concat(
            Object.keys(data[year]).flatMap(race => ({
              x: parseInt(year, 10),
              y: data[year][race],
              series: race
            }))
          ),
        []
      )
  }
};

const housingDisplacementData = new Reduxful(
  "housingDisplacementData",
  apiDesc,
  apiConfig
);

export default housingDisplacementData;
