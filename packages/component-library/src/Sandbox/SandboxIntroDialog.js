import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx } from "@emotion/core";

import Dialog from "../Dialog/Dialog";
import ButtonNew from "../ButtonNew/ButtonNew";

const SandboxIntroDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <h1>CIVIC Sandbox</h1>
    <p>
      The CIVIC Sandbox is a curated data exploration tool to encourage
      exploration, enable comparison, and impact decision making.
    </p>
    <ButtonNew label="Add Your Data" />
    <ButtonNew label="Explore Data" onClick={onClose} />
  </Dialog>
);

SandboxIntroDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default SandboxIntroDialog;
