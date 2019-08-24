---
to: packages/<%=package%>/src/state/<%=slug%>/api.js
---
import Reduxful from "reduxful";
import requestAdapter from "../request-adapter";

const apiConfig = { requestAdapter };

const HOST = "https://service.civicpdx.org/transportation-systems";

const apiDesc = {
  get<%=API%>Data: {
    url: `${HOST}/passenger-census/system/annual/averages/?format=json`
  }
};

const <%=storyCardName%>Data = new Reduxful("<%=storyCardName%>Data", apiDesc, apiConfig);

export default <%=storyCardName%>Data;
