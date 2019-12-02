import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Dialog from "../Dialog/Dialog";
import ButtonNew from "../ButtonNew/ButtonNew";

const contentWrapper = css`
  margin: 20px;
`;

const buttonWrapper = css`
  display: flex;
  justify-content: space-evenly;
`;

const SandboxIntroDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <div css={contentWrapper}>
      <h1>CIVIC Sandbox</h1>
      <h2>
        The CIVIC Sandbox is a curated data exploration tool to encourage
        exploration, enable comparison, and impact decision making.
      </h2>
      <div css={buttonWrapper}>
        <ButtonNew label="Add Your Data" />
        <ButtonNew label="Explore Data" onClick={onClose} />
      </div>
    </div>
  </Dialog>
);

SandboxIntroDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default SandboxIntroDialog;
