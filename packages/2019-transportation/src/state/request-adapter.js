import fetch from "cross-fetch";
import { makeFetchAdapter } from "reduxful";

export default makeFetchAdapter(fetch);
