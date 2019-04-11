import axios from 'axios';

const echo = a => a;

const apiAdapter = (url, { start, success, failure }) => () => dispatch => {
  dispatch(start());
  const secureURL = url.includes('https') ? url : `${url.slice(0,4)}s${url.slice(4)}`;
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
  const url = slide.endpoint;
  const secureURL = url.includes('https') ? url : `${url.slice(0,4)}s${url.slice(4)}`;
  return axios
    .get(`${secureURL}${date}`)
    .then(res => {
      dispatch(
        success({
          name: slide.label,
          data: res.data,
          type,
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
  dispatch(start());
  const fullUrls = slides.map(slide => {
    const url = slide.endpoint;
    const secureURL = url.includes('https') ? url : `${url.slice(0,4)}s${url.slice(4)}`;
    return axios.get(secureURL);
  });

  return axios
    .all(fullUrls)
    .then(
      axios.spread((...res) => {
        dispatch(
          success(
            res.map((r, i) => ({
              [slides[i].name]: r.data,
            }))
          )
        );
        return res;
      })
    )
    .catch(err => {
      dispatch(failure(err));
    });
};

export default apiAdapter;
