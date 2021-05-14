/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const ContentStorycard = () => (
  <Fragment>
    <h3>Data Point of Contact</h3>
    <ul>
      <li>
        <a href="">Contact Name</a>, Organization Name
      </li>
    </ul>
    <h3>Project Team</h3>
    <ul>
      <li>Project Team Member</li>
      <li>Project Team Member</li>
      <li>Project Team Member</li>
      <li>Project Team Member</li>
    </ul>
    <h3>Context Team</h3>
    <ul>
      <li>Context Team Member</li>
      <li>Context Team Member</li>
      <li>Context Team Member</li>
      <li>Context Team Member</li>
      <li>Context Team Member</li>
      <li>Context Team Member</li>
      <li>Context Team Member</li>
      <li>Context Team Member</li>
    </ul>
    <h3>Contributing Specialists</h3>
    <ul>
      <li>Specialist Contributor</li>
      <li>Specialist Contributor</li>
      <li>Specialist Contributor</li>
    </ul>
  </Fragment>
);
const ContentA = () => (
  <Fragment>
    <h3>Data Point of Contact</h3>
    <h3>Project Team</h3>
    <h3>Context Team</h3>
    <h3>Contributing Specialists</h3>
  </Fragment>
);
const ContentB = () => (
  <Fragment>
    <h3>Data Point of Contact</h3>
    <h3>Project Team</h3>
    <h3>Context Team</h3>
    <h3>Contributing Specialists</h3>
  </Fragment>
);

const Attribution = () => (
  <AccordianContentContainer>
    <DataTabs
      Storycard={ContentStorycard}
      DatasetA={ContentA}
      DatasetB={ContentB}
    />
  </AccordianContentContainer>
);

export default Attribution;
