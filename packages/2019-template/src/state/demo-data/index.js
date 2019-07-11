import importReducer from "../import-adapter-reducer";
import { IMPORT_START, IMPORT_SUCCESS } from "./actions";

const INITIAL_STATE = {
  pending: false,
  data: null
};

export default importReducer({ INITIAL_STATE, IMPORT_START, IMPORT_SUCCESS });
