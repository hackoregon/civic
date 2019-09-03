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
  // const layerURLS = slidesArray
  //   .map(s => {
  //     return s.layers.map(d => d.layerEndpoint);
  //   })
  //   .reduce((a, c) => [...a, ...c], []);
  // console.log("fetchAllSlidesAdapter-layerURLS", layerURLS);

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
          // .filter(d => ![...layerObjects.map(d => d.dataEndpoint)].include(d) );

          // .reduce((a,c) => a.indexOf(c) === -1 ? [...a, c] : [...a, ""], []);
        // console.log("fetchAllSlidesAdapter-dataURLS:", dataURLS);

        // if (dataURLS.length) {
        //   console.log("fetchAllSlidesAdapter-dataURLS-leng:", dataURLS.length);
        //   return;
        // }

        // const fetchData = dataURLS.map((url,i) => {
        //   return slidesArray[i].defaultSlide ? axios.get(url) : [];
        // });
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
      // .catch(err => {
      //   dispatch(failure(err));
      // })
  );
};

export default apiAdapter;
