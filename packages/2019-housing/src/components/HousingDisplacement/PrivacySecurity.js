/** @jsx jsx */
import { jsx } from "@emotion/core";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const DatasetA = () => (
  <div>
    <h3>Risk Management</h3>
    <h4>Existing Security Protocols</h4>
    <h4>Audit Trails</h4>
    <h3>Data Disclosure</h3>
    <h3>Data Protection</h3>
  </div>
);

const DatasetB = () => (
  <div>
    <h3>Permissions, Protocols, and Requests</h3>
    <h3>Machine Accessibility</h3>
    <h3>Data Storage/Format</h3>
    <h3>Data Integration</h3>
  </div>
);

const PrivacySecurity = () => (
  <AccordianContentContainer>
    <DataTabs DatasetA={DatasetA} DatasetB={DatasetB} />
  </AccordianContentContainer>
);

export default PrivacySecurity;
