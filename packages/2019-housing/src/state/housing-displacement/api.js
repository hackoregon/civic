import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/housing2019/v1/api";

const apiDesc = {
  getHomeownershipByRaceData: {
    url: `${HOST}/portland-metro-tract-population-by-race`,
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
  },
  getNcdbYearlyData: {
    url: `${HOST}/ncdbsampleyearly/`,
    // you can apply any needed data transformations to value here
    // if complex, separate tranformation function to another file
    dataTransform: data => data
  }
};

const housingDisplacementData = new Reduxful(
  "housingDisplacementData",
  apiDesc,
  apiConfig
);

export default housingDisplacementData;
