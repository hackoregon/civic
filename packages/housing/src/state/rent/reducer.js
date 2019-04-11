import { INITIAL_STATE, actionTypes } from "./constants";
import { apiReducer } from "../utils";

export default apiReducer({ INITIAL_STATE, ...actionTypes });
