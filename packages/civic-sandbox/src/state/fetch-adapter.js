import axios from "axios";

const echo = a => a;
/* global console */
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
  console.log("fetchLayersAdapter-layersArr", layersArr);
  dispatch(start());

  const fetchLayers = layersArr.map(layerObj => {
    // console.log("fetchLayersAdapter-slide", slide);
    const url = layerObj.slide.layerEndpoint;
    const isSecureURL = url.includes("https")
      ? url
      : `${url.slice(0, 4)}s${url.slice(4)}`;
    return axios.get(isSecureURL);
  });
  // console.log("fetchLayersAdapter-fetchLayers", fetchLayers);
  return (
    axios
      .all(fetchLayers)
      .then(layerDataArr => {
        console.log("fetchLayersAdapter-layerDataArr:", layerDataArr);

        const geoDataURLs = layerDataArr.map((layer,i) => {
          return {
            url: layer.data.dataEndpoint,
            prevData: layersArr[i].geoJSON
          };
        });
        console.log("fetchLayersAdapter-geoDataURLs:", geoDataURLs);

        const fetchGeoData = geoDataURLs.map((gd, i, arr) => {
          const findMatch = arr.findIndex(d => d.url === gd.url && d.prevData);
          console.log("fetchLayersAdapter-findMatch:", findMatch);

          return findMatch > -1
            ? ( { data: { results: layersArr[findMatch].geoJSON} } )
            : gd.url && layersArr[i].defaultSlide && !layersArr[i].geoJSON
            ? axios.get(gd.url)
            : {};
        });

        // console.log("fetchLayersAdapter-dispatched");

        return axios.all(fetchGeoData).then(geoData => {
        console.log("fetchLayersAdapter-geoData:", geoData);
          const layerAndGeoData = geoData.map((g, i) => {
            return {
              ...g.data,
              ...layerDataArr[i].data
            };
          });
        console.log("fetchLayersAdapter-layerAndGeoData:", layerAndGeoData, "\n");

          dispatch(
            success(layerAndGeoData)
          );
          return geoData;
        }
        ).catch(err => {
          dispatch(failure(err));
        });
      })
  );
};

export default apiAdapter;
