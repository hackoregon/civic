/** @jsx jsx */
import { jsx } from "@emotion/core";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";
import Checkbox from "./Checkbox";

const DatasetA = () => (
  <div>
    <h3>Permissions, Protocols, and Requests</h3>
    <p>
      <em>
        This is where information about permissions and formal protocols for
        dataset and analysis use are recorded. Information about how to submit
        requests for further information and other dataset and analysis use
        cases are also recorded here
      </em>
    </p>
    <h3>Accessibility</h3>
    <p>
      <Checkbox checked /> Machine-readable format
    </p>
    <p>
      <Checkbox checked /> Human-readable format
    </p>
    <p>
      <Checkbox /> Publicly accessible
    </p>
  </div>
);

const DatasetB = () => (
  <div>
    <h3>Permissions, Protocols, and Requests</h3>
    <p>
      <em>
        This is where information about permissions and formal protocols for
        dataset and analysis use are recorded. Information about how to submit
        requests for further information and other dataset and analysis use
        cases are also recorded here
      </em>
    </p>
    <h3>Accessibility</h3>
    <p>
      <Checkbox checked /> Machine-readable format
    </p>
    <p>
      <Checkbox /> Human-readable format
    </p>
    <p>
      <Checkbox checked /> Publicly accessible
    </p>
  </div>
);

const Access = () => (
  <AccordianContentContainer>
    <DataTabs DatasetA={DatasetA} DatasetB={DatasetB} />
  </AccordianContentContainer>
);

export default Access;
