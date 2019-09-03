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
  // const url = slide.endpoint;
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

export const fetchAllSlidesAdapter = (
  slidesArray,
  { start, success, failure }
) => () => dispatch => {
  // console.log("\n");
  // console.log("fetchAllSlidesAdapter");
  console.log("fetchAllSlidesAdapter-slidesArray", slidesArray);
  dispatch(start());

  const layerUrls = slidesArray.map(oneSlide => {
    // console.log("fetchAllSlidesAdapter-slide", slide);
    const url = oneSlide.slide.layerEndpoint;
    const secureURL = url.includes("https")
      ? url
      : `${url.slice(0, 4)}s${url.slice(4)}`;
    // console.log("fetchAllSlidesAdapter-secureURL", secureURL);
    return axios.get(secureURL); //promise
  });
  // console.log("fetchAllSlidesAdapter-layerUrls", layerUrls); //promises

  return (
    axios
      .all(layerUrls)
      .then(layerObjects => {
        // console.log("l:", l);
        const dataURLS = [...layerObjects]
          .map(l2 => l2.data.dataEndpoint);

        const fetchData = dataURLS.map((url,i) => {
          return url && slidesArray[i].defaultSlide ? axios.get(url) : [];
        });

        return axios.all(fetchData).then(
          axios.spread((...layerData) => {
            // console.log("layerData:", layerData);
            dispatch(
              success(
                layerData.map((d, i) => ({
                  ...d.data,
                  ...layerObjects[i].data
                }))
              )
            );
            return layerData;
          })
        ).catch(err => {
          dispatch(failure(err));
        });

      })
  );
};

export default apiAdapter;
