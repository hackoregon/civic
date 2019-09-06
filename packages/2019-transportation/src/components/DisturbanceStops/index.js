import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import disturbanceStopsMeta from "./disturbanceStopsMeta";
import disturbanceStopsLineChartMeta from "./disturbanceStopsLineChartMeta";
import api from "../../state/disturbance-stops/api";

const limit = 2000;
const offset = 0;
const months = "9,10,11";
const timeRange = "6.25,9.5";
const years = "2017,2018";
const lines = "6,10,14";
const bounds = "-122.665849,45.510867,-122.653650,45.514367";
const testUrl = `http://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=${limit}&offset=${offset}&months=${months}&time_range=${timeRange}&years=${years}&lines=${lines}&service_key=W&bounds=${bounds}`;

export const DataContext = React.createContext({});

const DisturbanceStops = ({ Layout }) => {
  const [loaded, setLoaded] = useState(false);
  const [requestUrl, setRequestUrl] = useState(testUrl);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios.get(requestUrl).then(response => {
      setFeatures([...features, ...response.data.results.features]);
      if (response.data.next) {
        setRequestUrl(response.data.next);
      } else {
        setLoaded(true);
      }
    });
  }, [requestUrl]); // eslint-disable-line

  return (
    <>
      <DataContext.Provider value={{ loaded, features }}>
        <CivicCard cardMeta={disturbanceStopsMeta} Layout={Layout} />
        <CivicCard cardMeta={disturbanceStopsLineChartMeta} Layout={Layout} />
      </DataContext.Provider>
    </>
  );
};

DisturbanceStops.displayName = "DisturbanceStops";
DisturbanceStops.tags = disturbanceStopsMeta().tags;

DisturbanceStops.propTypes = {
  data: PropTypes.shape({ disturbanceStops: resourceShape }),
  Layout: PropTypes.func
};

export default connect(state => ({
  data: {
    disturbanceStops: api.selectors.getDisturbanceStopsData(
      state.package2019Transportation || state
    )
  }
  // state.packageProjectName || state needed to make work in the project package and 2018 package
}))(DisturbanceStops);
