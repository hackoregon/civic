---
to: packages/<%=package%>/src/state/request-adapter.js
unless_exists: true
---
import fetch from "cross-fetch";
import { makeFetchAdapter } from "reduxful";

export default makeFetchAdapter(fetch);
