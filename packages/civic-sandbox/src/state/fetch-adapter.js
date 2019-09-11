/* eslint-disable no-nested-ternary */
import axios from "axios";

const apiAdapter = (url, { start, success, failure }) => () => dispatch => {
  dispatch(start());
  const secureURL = url.includes("https")
    ? url
    : `${url.slice(0, 4)}s${url.slice(4)}`;
  return axios
    .get(secureURL)
    .then(res => {
      dispatch(success(res.data));
      return res;
    })
    .catch(err => {
      dispatch(failure(err));
    });
};

export const fetchByDateAdapter = (
  slide,
  date,
  type,
  { start, success, failure }
) => () => dispatch => {
  dispatch(start());
  const url = slide.layerEndpoint;
  const secureURL = url.includes("https")
    ? url
    : `${url.slice(0, 4)}s${url.slice(4)}`;
  return axios
    .get(`${secureURL}${date}`)
    .then(res => {
      dispatch(
        success({
          name: slide.label,
          data: res.data,
          type
        })
      );
      return res;
    })
    .catch(err => {
      dispatch(failure(err));
    });
};

export const fetchLayersAdapter = (
  layersArr,
  { start, success, failure }
) => () => dispatch => {
  dispatch(start());

  const fetchLayers = layersArr.map(layerObj => {
    const url = layerObj.slide.layerEndpoint;
    const isSecureURL = url.includes("https")
      ? url
      : `${url.slice(0, 4)}s${url.slice(4)}`;
    return axios.get(isSecureURL);
  });
  return axios.all(fetchLayers).then(layerDataArr => {
    const geoDataURLs = layerDataArr.map((layer, i) => {
      return {
        url: layer.data.dataEndpoint,
        prevData: layersArr[i].geoJSON
      };
    });

    const fetchGeoData = geoDataURLs.map((gd, i, arr) => {
      const findMatch = arr.findIndex(d => d.url === gd.url && d.prevData);
      return findMatch > -1
        ? { data: { results: layersArr[findMatch].geoJSON } }
        : gd.url && layersArr[i].defaultSlide && !layersArr[i].geoJSON
        ? axios.get(gd.url)
        : {};
    });

    return axios
      .all(fetchGeoData)
      .then(geoData => {
        const layerAndGeoData = geoData.map((g, i) => {
          return {
            ...g.data,
            ...layerDataArr[i].data
          };
        });
        dispatch(success(layerAndGeoData));
        return geoData;
      })
      .catch(err => {
        dispatch(failure(err));
      });
  });
};

export default apiAdapter;
