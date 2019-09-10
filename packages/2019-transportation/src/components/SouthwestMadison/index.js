import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import axios from "axios";
import southwestMadisonMeta from "./southwestMadisonMeta";

const BOUNDING_BOX = {
  SOUTHWEST_MADISON: "-122.683993,45.514410,-122.672901,45.516783"
};

const DIRECTION = {
  INBOUND: "I",
  OUTBOUND: "O"
};

const limit = 2000;
const offset = 0;
const months = "5,7";
const timeRange = "14.5,18.75";
const years = "2018,2019";
const lines = "6,14";
const initialUrl = `http://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=${limit}&offset=${offset}&months=${months}&time_range=${timeRange}&years=${years}&lines=${lines}&service_key=W&bounds=${
  BOUNDING_BOX.SOUTHWEST_MADISON
}&directions=${DIRECTION.OUTBOUND}`;

export const SouthwestMadisonContext = React.createContext({});

const SouthwestMadison = ({ Layout }) => {
  const [loaded, setLoaded] = useState(false);
  const [requestUrl, setRequestUrl] = useState(initialUrl);
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
      <SouthwestMadisonContext.Provider value={{ loaded, features }}>
        <CivicCard cardMeta={southwestMadisonMeta} Layout={Layout} />
      </SouthwestMadisonContext.Provider>
    </>
  );
};

SouthwestMadison.displayName = "SouthwestMadison";

SouthwestMadison.propTypes = {
  Layout: PropTypes.func
};

export default connect()(SouthwestMadison);
