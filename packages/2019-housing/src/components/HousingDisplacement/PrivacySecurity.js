/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import AccordianContentContainer from "./AccordianContentContainer";
import Checkbox from "./Checkbox";
import DataTabs from "./DataTabs";

const DatasetA = () => (
  <div>
    <h3>Risk Management</h3>
    <p>
      <Checkbox checked /> Conforms to relevant security protocols.{" "}
      <a href="#">Read more</a>
    </p>
    <p>
      <Checkbox checked /> Audit trails. <a href="#">Read more</a>
    </p>
    <h3>Data Disclosure</h3>
    <p>
      <Checkbox /> Has standardized data disclosure protocol that is publicly
      accessible. <a href="#">Read more</a>
    </p>
    <h3>Data Protection</h3>
    <p>
      <em>
        This refers to rules and practices surrounding how data are safeguarded
        and/or anonymized.
      </em>
    </p>
    <p>
      <Checkbox checked /> Data access complies with data protection protocols
      in place for this dataset
    </p>
    <p>
      <Checkbox checked /> Data use complies with data protection protocols in
      place for this dataset
    </p>
    <p>
      <Checkbox /> Data are anonymized
    </p>
  </div>
);

const DatasetB = () => (
  <div>
    <div>
      <h3>Risk Management</h3>
      <p>
        <Checkbox /> Conforms to relevant security protocols.{" "}
        <a href="#">Read more</a>
      </p>
      <p>
        <Checkbox checked /> Audit trails. <a href="#">Read more</a>
      </p>
      <h3>Data Disclosure</h3>
      <p>
        <Checkbox checked /> Has standardized data disclosure protocol that is
        publicly accessible. <a href="#">Read more</a>
      </p>
      <h3>Data Protection</h3>
      <p>
        <em>
          This refers to rules and practices surrounding how data are
          safeguarded and/or anonymized.
        </em>
      </p>
      <p>
        <Checkbox /> Data access complies with data protection protocols in
        place for this dataset
      </p>
      <p>
        <Checkbox checked /> Data use complies with data protection protocols in
        place for this dataset
      </p>
      <p>
        <Checkbox /> Data are anonymized
      </p>
    </div>
  </div>
);

const PrivacySecurity = () => (
  <AccordianContentContainer>
    <DataTabs DatasetA={DatasetA} DatasetB={DatasetB} />
  </AccordianContentContainer>
);

export default PrivacySecurity;
