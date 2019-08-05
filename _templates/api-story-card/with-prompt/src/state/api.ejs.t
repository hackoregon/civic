---
to: packages/<%=package%>/src/state/<%=slug%>-data/api.js
---
import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

// FIXME: getRidershipOverTime should be variable (or more clearly mock data)
const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  getRidershipOverTime: {
    url: `${HOST}/passenger-census/system/annual/averages/?format=json`
  }
};

const <%=storyCardName%>Data = new Reduxful("<%=storyCardName%>Data", apiDesc, apiConfig);

export default <%=storyCardName%>Data;
