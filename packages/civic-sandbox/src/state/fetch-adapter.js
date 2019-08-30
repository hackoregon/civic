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
  slides,
  { start, success, failure }
) => () => dispatch => {
  console.log("\n");
  console.log("fetchAllSlidesAdapter");
  console.log("fetchAllSlidesAdapter-slides", slides);
  dispatch(start());
  const layerURLS = slides
    .map(s => {
      return s.layers.map(d => d.layerEndpoint);
    })
    .reduce((a, c) => [...a, ...c], []);
  console.log("fetchAllSlidesAdapter-layerURLS", layerURLS);

  const fullUrls = layerURLS.map(slide => {
    // console.log("fetchAllSlidesAdapter-slide", slide);
    // const url = slide.endpoint;
    const secureURL = slide.includes("https")
      ? slide
      : `${slide.slice(0, 4)}s${slide.slice(4)}`;
    // console.log("fetchAllSlidesAdapter-secureURL", secureURL);
    return axios.get(secureURL);
  });
  // console.log("fetchAllSlidesAdapter-fullUrls", fullUrls); //promises
  return (
    axios
      .all(fullUrls)
      .then(d => {
        console.log("d:", d);
        const dataURLS = d.map(d => d.data.dataEndpoint);
        console.log("dataURLS:", dataURLS);
        const fetchData = dataURLS.map(d => axios.get(d));
        return axios.all(fetchData).then(
          axios.spread((...res) => {
            console.log("resp:", res);
            dispatch(
              success(
                res.map((r, i) => ({
                  ...r.data,
                  ...d[i].data
                }))
              )
            );
            return res;
          })
        );
      })
      // .then(d2 => {
      //   console.log("d2:", d2);

      // })

      // .then(
      // axios.spread((...res) => {
      //   console.log("resp:", res);
      //   dispatch(
      //     success(
      //       res.map((r) => ({
      //         ...r.data
      //       }))
      //     )
      //   );
      //   return res;
      // })
      // )
      .catch(err => {
        dispatch(failure(err));
      })
  );
};

export default apiAdapter;
