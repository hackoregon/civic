---
to: packages/<%=package%>/src/state/<%=slug%>/api.js
---
import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

// FIXME: getMockRidershipData should be variable
const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  getMockRidershipData: {
    url: `${HOST}/passenger-census/system/annual/averages/?format=json`
  }
};

const <%=storyCardName%>Data = new Reduxful("<%=storyCardName%>Data", apiDesc, apiConfig);

export default <%=storyCardName%>Data;
