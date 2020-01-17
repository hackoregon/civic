import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicCard } from "@hackoregon/component-library";

import axios from "axios";
import northwestEverettMeta from "./northwestEverettMeta";

const BOUNDING_BOX = {
  NORTHWEST_EVERETT: "-122.677515,45.524831,-122.671534,45.525699"
};

const DIRECTION = {
  INBOUND: "I",
  OUTBOUND: "O"
};

const limit = 2000;
const offset = 0;
const months = "8";
const timeRange = "14.5,18.75";
const years = "2018,2019";
const lines = "4,8,16,35,44,77";

const initialUrl = `https://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?limit=${limit}&offset=${offset}&months=${months}&time_range=${timeRange}&years=${years}&lines=${lines}&service_key=W&bounds=${
  BOUNDING_BOX.NORTHWEST_EVERETT
}&directions=${DIRECTION.OUTBOUND}`;

// https://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?months=8&directions=O&time_range=6.5,9&years=2018&lines=4,8,16,35,44,77&service_key=W

export const NorthwestEverettContext = React.createContext({});

const NorthwestEverett = ({ Layout }) => {
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
      <NorthwestEverettContext.Provider value={{ loaded, features }}>
        <CivicCard cardMeta={northwestEverettMeta} Layout={Layout} />
      </NorthwestEverettContext.Provider>
    </>
  );
};

NorthwestEverett.displayName = "NorthwestEverett";

NorthwestEverett.propTypes = {
  Layout: PropTypes.func
};

export default connect()(NorthwestEverett);
