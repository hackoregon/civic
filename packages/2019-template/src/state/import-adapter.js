// A redux action utility for making a thunk based on an async file import
// ex. const someJsonInRepo = importAdapter('../assets/some.json', { start, success });
//     dispatch(someJsonInRepo())
const importAdapter = (importPromise, { start, success }) => () => dispatch => {
  dispatch(start());
  return importPromise.then(res => {
    dispatch(success(res));
  });
};

export default importAdapter;
