// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { string, arrayOf, func } from "prop-types";
/* global fetch */

const DemoJSONLoader = props => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const promisesArr = props.urls.map(url => {
      return fetch(url)
        .then(response => response)
        .then(response =>
          response.ok
            ? response.json()
            : {
                error: `${response.status}: ${response.statusText}`,
                slide_meta: {},
                slide_data: {}
              }
        );
    });
    Promise.all(promisesArr)
      .then(response => setData(response))
      .catch(error => {
        throw new Error(error);
      });
  }, [props.urls[0]]);

  if (data === null) {
    return null;
  }
  return data.length === 1 ? props.children(data[0]) : props.children(data);
};

DemoJSONLoader.propTypes = {
  urls: arrayOf(string).isRequired,
  children: func
};

export default DemoJSONLoader;
