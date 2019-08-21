---
to: packages/<%=year%>-<%=packageTitle%>/src/index.js
---
import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

const CardRegistry = [
  // leave space for card injection
];

export { App, Routes, Reducers, CardRegistry };
