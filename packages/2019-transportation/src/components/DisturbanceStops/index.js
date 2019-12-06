import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import disturbanceStopsMeta from "./southeastHawthorneMeta";
import api from "../../state/disturbance-stops/api";

const CENTER_POINT = {
  "Hawthorne Approach": {
    latitude: 45.512,
    longitude: -122.659
  }
};

const BOUNDING_BOX = {
  "Hawthorne Approach": "-122.665849,45.510867,-122.653650,45.514367"
};

const DIRECTION = {
  INBOUND: "I",
  OUTBOUND: "O"
};

// https://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=100&offset=400&months=9&time_range=6.25%2C9.5&years=2017%2C2018&lines=6%2C10%2C14&service_key=W&bounds=-122.665849%2C45.510867%2C-122.653650%2C45.514367
const limit = 2000;
const offset = 0;
const months = "9,10,11";
const timeRange = "6.25,9.5";
const years = "2017,2018";
const lines = "10,14";
const testUrl = `https://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=${limit}&offset=${offset}&months=${months}&time_range=${timeRange}&years=${years}&lines=${lines}&service_key=W&bounds=${
  BOUNDING_BOX["Hawthorne Approach"]
}&directions=${DIRECTION.INBOUND}`;

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
      <DataContext.Provider
        value={{ loaded, features, center: CENTER_POINT["Hawthorne Approach"] }}
      >
        <CivicCard cardMeta={disturbanceStopsMeta} Layout={Layout} />
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
}))(DisturbanceStops);
