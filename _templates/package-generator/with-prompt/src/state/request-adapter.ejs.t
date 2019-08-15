---
to: packages/<%=package%>/src/state/request-adapter.js
---
import fetch from "cross-fetch";
import { makeFetchAdapter } from "reduxful";

export default makeFetchAdapter(fetch);
