/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { node } from "prop-types";

const AccordianContentContainer = ({ children }) => (
  <div
    css={css`
      margin: 0 1rem;
    `}
  >
    {children}
  </div>
);

AccordianContentContainer.propTypes = {
  children: node
};

export default AccordianContentContainer;
