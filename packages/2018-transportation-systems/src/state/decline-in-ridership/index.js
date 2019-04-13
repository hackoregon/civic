import apiReducer from "../api-adapter-reducer";
import { API_START, API_SUCCESS, API_ERROR } from "./actions";

const INITIAL_STATE = {
  pending: false,
  error: null,
  data: null
};

export default apiReducer({ INITIAL_STATE, API_START, API_SUCCESS, API_ERROR });
